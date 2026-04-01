from app.core.database import db

def create_user(user_data):
    return db.users.insert_one(user_data)

def get_user_by_email(email: str):
    return db.users.find_one({"email": email})