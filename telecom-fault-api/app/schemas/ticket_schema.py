from pydantic import BaseModel
from datetime import datetime

class ResolveTicketSchema(BaseModel):
    note: str

class TicketCreateSchema(BaseModel):
    issue_type: str
    description: str

class TicketResponseSchema(BaseModel):
    id: str
    user_id: str
    issue_type: str
    description: str
    status: str
    created_at: datetime