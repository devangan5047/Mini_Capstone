from pydantic import BaseModel

class NetworkCreate(BaseModel):
    tower_id: str
    location: str
    status: str