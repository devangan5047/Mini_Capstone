from fastapi import APIRouter
from app.schemas.auth_schema import RegisterSchema, LoginSchema
from app.services.auth_service import register_user, login_user

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register")
def register(data: RegisterSchema):
    return register_user(data)

@router.post("/login")
def login(data: LoginSchema):
    return login_user(data)