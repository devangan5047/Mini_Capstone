from app.repositories.assignment_repository import create_assignment, get_assignments_by_engineer
from app.repositories.ticket_repository import update_ticket_status
from app.models.assignment_model import assignment_helper
from datetime import datetime

def assign_ticket_service(ticket_id, engineer_id):
    update_ticket_status(ticket_id, "assigned")

    assignment = {
        "ticket_id": ticket_id,
        "engineer_id": engineer_id,
        "assigned_at": datetime.utcnow(),
        "status": "assigned"
    }

    create_assignment(assignment)

    return {"message": "Ticket assigned successfully"}

def get_engineer_tickets_service(engineer_id):
    assignments = get_assignments_by_engineer(engineer_id)
    return [assignment_helper(a) for a in assignments]