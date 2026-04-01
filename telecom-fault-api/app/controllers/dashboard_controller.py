from fastapi import APIRouter, Depends
from app.services.dashboard_service import dashboard_service
from app.core.dependencies import require_roles

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/")
def get_dashboard(user=Depends(require_roles("admin"))):
    return dashboard_service()
