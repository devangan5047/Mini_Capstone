def assignment_helper(a) -> dict:
    return {
        "id": str(a["_id"]),
        "ticket_id": str(a["ticket_id"]),
        "engineer_id": str(a["engineer_id"]),
        "assigned_at": a["assigned_at"],
        "status": a["status"]
    }