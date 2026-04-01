import { useEffect, useState } from "react";
import { getMyAssignments } from "../api/networkApi";
import { resolveTicket } from "../api/ticketApi";

const EngineerDashboard = () => {
    const [assignments, setAssignments] = useState([]);
    const [ticketId, setTicketId] = useState("");
    const [note, setNote] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchAssignments = async () => {
            const token = localStorage.getItem("token");
            const response = await getMyAssignments(token);
            setAssignments(response.data);
        };

        fetchAssignments();
    }, []);

    const handleResolve = async () => {
        const token = localStorage.getItem("token");

        await resolveTicket(ticketId, note, token);
        setAssignments((current) =>
            current.map((assignment) =>
                assignment.ticket_id === ticketId ? { ...assignment, status: "resolved" } : assignment,
            ),
        );
        setMessage(`Ticket ${ticketId} updated to resolved.`);
    };

    return (
        <div className="min-h-screen bg-slate-100 px-6 py-10">
            <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-slate-900">Engineer Dashboard</h2>
                <p className="mt-2 text-slate-600">
                    Field engineer access only. Resolve assigned network incidents and document fix notes.
                </p>

                <div className="mt-6 rounded-3xl bg-emerald-50 p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Assigned Tickets</p>
                    <div className="mt-4 space-y-3">
                        {assignments.length === 0 && <p className="text-sm text-slate-600">No assignments yet.</p>}
                        {assignments.map((assignment) => (
                            <button
                                key={assignment.id}
                                className="flex w-full items-center justify-between rounded-2xl bg-white px-4 py-3 text-left shadow-sm"
                                onClick={() => setTicketId(assignment.ticket_id)}
                            >
                                <span className="font-medium text-slate-900">{assignment.ticket_id}</span>
                                <span className="text-sm text-slate-600">{assignment.status}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-6 space-y-4">
                    <input
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        placeholder="Ticket ID"
                        onChange={(e) => setTicketId(e.target.value)}
                    />

                    <input
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        placeholder="Resolution note"
                        onChange={(e) => setNote(e.target.value)}
                    />

                    <button className="rounded-xl bg-emerald-600 px-5 py-3 font-medium text-white" onClick={handleResolve}>
                        Update Status to Resolved
                    </button>
                    {message && <p className="text-sm text-emerald-700">{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default EngineerDashboard;
