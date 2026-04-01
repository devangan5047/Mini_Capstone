from app.repositories.dashboard_repository import get_ticket_stats, get_engineer_performance

def dashboard_service():
    stats = get_ticket_stats()
    performance = get_engineer_performance()

    return {
        "stats": stats,
        "engineer_performance": performance
    }