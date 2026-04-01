def ticket_helper(ticket) -> dict:
    return {
        "id": str(ticket["_id"]),
        "user_id": str(ticket["user_id"]),
        "issue_type": ticket["issue_type"],
        "description": ticket["description"],
        "status": ticket["status"],
        "created_at": ticket["created_at"]
    }