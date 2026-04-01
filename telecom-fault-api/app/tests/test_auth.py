import pytest
from fastapi import HTTPException
from pydantic import ValidationError

from app.core.dependencies import require_roles
from app.schemas.auth_schema import RegisterSchema
from app.services.auth_service import login_user, register_user


def test_register_schema_rejects_unknown_role():
    with pytest.raises(ValidationError):
        RegisterSchema(
            name="Test User",
            email="test@example.com",
            password="secret123",
            role="noc_manager",
        )


def test_require_roles_blocks_user_with_wrong_role():
    dependency = require_roles("admin")

    with pytest.raises(HTTPException) as exc:
        dependency({"user_id": "1", "role": "customer"})

    assert exc.value.status_code == 403
    assert exc.value.detail == "Access restricted to: admin"


def test_register_user_creates_supported_role(monkeypatch):
    created_user = {}

    def fake_get_user_by_email(email):
        return None

    def fake_create_user(payload):
        created_user.update(payload)

    monkeypatch.setattr("app.services.auth_service.get_user_by_email", fake_get_user_by_email)
    monkeypatch.setattr("app.services.auth_service.create_user", fake_create_user)
    monkeypatch.setattr("app.services.auth_service.hash_password", lambda password: f"hashed::{password}")

    payload = RegisterSchema(
        name="Engineer One",
        email="engineer@example.com",
        password="secret123",
        role="engineer",
    )

    response = register_user(payload)

    assert response == {"message": "User registered successfully"}
    assert created_user["role"] == "engineer"
    assert created_user["password"] == "hashed::secret123"


def test_login_user_returns_access_token_and_role(monkeypatch):
    def fake_get_user_by_email(email):
        return {
            "_id": "507f1f77bcf86cd799439011",
            "email": email,
            "password": "hashed-password",
            "role": "admin",
        }

    monkeypatch.setattr("app.services.auth_service.get_user_by_email", fake_get_user_by_email)
    monkeypatch.setattr("app.services.auth_service.verify_password", lambda plain, hashed: True)
    monkeypatch.setattr("app.services.auth_service.create_access_token", lambda payload: f"token-for-{payload['role']}")

    response = login_user(type("LoginInput", (), {"email": "admin@example.com", "password": "secret123"})())

    assert response == {"access_token": "token-for-admin", "role": "admin"}
