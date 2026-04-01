from app.repositories.ticket_repository import create_ticket, get_tickets_by_user, get_all_tickets
from app.models.ticket_model import ticket_helper
from datetime import datetime
from app.repositories.ticket_repository import resolve_ticket

def resolve_ticket_service(ticket_id, note):
    resolve_ticket(ticket_id, note)
    return {"message": "Ticket resolved successfully"}

def create_ticket_service(user_id, data):
    ticket = {
        "user_id": user_id,
        "issue_type": data.issue_type,
        "description": data.description,
        "status": "open",
        "created_at": datetime.utcnow()
    }

    result = create_ticket(ticket)

    return {"message": "Ticket created successfully", "id": str(result.inserted_id)}

def get_my_tickets_service(user_id):
    tickets = get_tickets_by_user(user_id)
    return [ticket_helper(t) for t in tickets]

def get_all_tickets_service():
    tickets = get_all_tickets()
    return [ticket_helper(t) for t in tickets]