from fastapi import APIRouter

router = APIRouter()

@router.get("/reports")
async def reports():
    return {"msg": "SLA metrics placeholder"}