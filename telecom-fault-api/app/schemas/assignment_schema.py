from pydantic import BaseModel

class AssignTicketSchema(BaseModel):
    engineer_id: str