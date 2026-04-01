from fastapi import HTTPException, status
from app.repositories.user_repository import create_user, get_user_by_email
from app.core.security import hash_password, verify_password, create_access_token
from app.core.rbac import ALLOWED_ROLES

def register_user(data):
    existing = get_user_by_email(data.email)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User already exists",
        )

    if data.role not in ALLOWED_ROLES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Role must be one of: {', '.join(ALLOWED_ROLES)}",
        )

    hashed_pwd = hash_password(data.password)

    user = {
        "name": data.name,
        "email": data.email,
        "password": hashed_pwd,
        "role": data.role,
        "is_active": True
    }

    create_user(user)
    return {"message": "User registered successfully"}

def login_user(data):
    user = get_user_by_email(data.email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    if not verify_password(data.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid password",
        )

    token = create_access_token({
        "user_id": str(user["_id"]),
        "role": user["role"]
    })

    return {"access_token": token, "role": user["role"]}
