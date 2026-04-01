from datetime import datetime
from app.services.assignment_service import assign_ticket_service


def test_assign_ticket_service_assigns_ticket_and_creates_assignment(monkeypatch):
    recorded = {}

    def fake_update_ticket_status(ticket_id, status):
        recorded["update_call"] = (ticket_id, status)

    def fake_create_assignment(data):
        recorded["assignment_data"] = data
        return None

    monkeypatch.setattr(
        "app.services.assignment_service.update_ticket_status",
        fake_update_ticket_status,
    )
    monkeypatch.setattr(
        "app.services.assignment_service.create_assignment",
        fake_create_assignment,
    )

    ticket_id = "644f3c9bcf5a2e2a1f0d6b44"
    engineer_id = "643a8c2baf7f4e7d9c1e2a12"

    result = assign_ticket_service(ticket_id, engineer_id)

    assert recorded["update_call"] == (ticket_id, "assigned")

    assignment_data = recorded["assignment_data"]
    assert assignment_data["ticket_id"] == ticket_id
    assert assignment_data["engineer_id"] == engineer_id
    assert assignment_data["status"] == "assigned"
    assert isinstance(assignment_data["assigned_at"], datetime)
    assert result == {"message": "Ticket assigned successfully"}
