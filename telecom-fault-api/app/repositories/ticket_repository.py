from app.core.database import db
from bson import ObjectId
from datetime import datetime

def resolve_ticket(ticket_id, note):
    return db.tickets.update_one(
        {"_id": ObjectId(ticket_id)},
        {
            "$set": {
                "status": "resolved",
                "resolved_at": datetime.utcnow(),
                "resolution_note": note
            }
        }
    )

def update_ticket_status(ticket_id, status):
    return db.tickets.update_one(
        {"_id": ObjectId(ticket_id)},
        {"$set": {"status": status}}
    )
def create_ticket(ticket):
    return db.tickets.insert_one(ticket)

def get_tickets_by_user(user_id):
    return list(db.tickets.find({"user_id": user_id}))

def get_all_tickets():
    return list(db.tickets.find())