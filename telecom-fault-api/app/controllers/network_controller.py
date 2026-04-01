from fastapi import APIRouter
from schemas.network_schema import NetworkCreate
from services.network_service import add_network_service, get_network_service

router = APIRouter()

@router.post("/")
async def add(network: NetworkCreate):
    return await add_network_service(network.dict())

@router.get("/")
async def get():
    return await get_network_service()