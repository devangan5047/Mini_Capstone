from app.core.database import db
from datetime import datetime

def create_assignment(data):
    return db.assignments.insert_one(data)

def get_assignments_by_engineer(engineer_id):
    return list(db.assignments.find({"engineer_id": engineer_id}))