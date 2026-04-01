from app.core.database import db

def get_ticket_stats():
    total = db.tickets.count_documents({})
    open_tickets = db.tickets.count_documents({"status": "open"})
    assigned = db.tickets.count_documents({"status": "assigned"})
    resolved = db.tickets.count_documents({"status": "resolved"})

    return {
        "total": total,
        "open": open_tickets,
        "assigned": assigned,
        "resolved": resolved
    }


def get_engineer_performance():
    pipeline = [
        {
            "$group": {
                "_id": "$engineer_id",
                "tickets_handled": {"$sum": 1}
            }
        }
    ]

    return list(db.assignments.aggregate(pipeline))