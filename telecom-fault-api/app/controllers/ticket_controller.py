from fastapi import APIRouter, Depends
from app.schemas.ticket_schema import TicketCreateSchema
from app.services.ticket_service import create_ticket_service, get_my_tickets_service, get_all_tickets_service
from app.core.dependencies import require_roles
from app.schemas.ticket_schema import ResolveTicketSchema
from app.services.ticket_service import resolve_ticket_service

router = APIRouter(prefix="/tickets", tags=["Tickets"])

@router.post("/")
def create_ticket(
    data: TicketCreateSchema,
    user=Depends(require_roles("customer")),
):
    return create_ticket_service(user["user_id"], data)

@router.get("/my")
def get_my_tickets(user=Depends(require_roles("customer"))):
    return get_my_tickets_service(user["user_id"])

@router.get("/")
def get_all_tickets(user=Depends(require_roles("admin"))):
    return get_all_tickets_service()

@router.put("/resolve/{ticket_id}")
def resolve_ticket_api(
    ticket_id: str,
    data: ResolveTicketSchema,
    user=Depends(require_roles("engineer")),
):
    return resolve_ticket_service(ticket_id, data.note)
