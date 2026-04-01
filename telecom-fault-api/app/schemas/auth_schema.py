from typing import Literal
from pydantic import BaseModel, EmailStr

class RegisterSchema(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: Literal["customer", "engineer", "admin"]

class LoginSchema(BaseModel):
    email: EmailStr
    password: str
