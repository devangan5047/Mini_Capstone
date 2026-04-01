from fastapi import APIRouter, Depends
from app.schemas.assignment_schema import AssignTicketSchema
from app.services.assignment_service import assign_ticket_service, get_engineer_tickets_service
from app.core.dependencies import require_roles

router = APIRouter(prefix="/assignments", tags=["Assignments"])

@router.put("/{ticket_id}")
def assign_ticket(ticket_id: str, data: AssignTicketSchema, user=Depends(require_roles("admin"))):
    return assign_ticket_service(ticket_id, data.engineer_id)

@router.get("/my")
def get_my_assignments(user=Depends(require_roles("engineer"))):
    return get_engineer_tickets_service(user["user_id"])
