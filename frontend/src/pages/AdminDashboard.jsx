import { useEffect, useState } from "react";
import { getDashboard, assignTicket } from "../api/networkApi";
import { getAllTickets } from "../api/ticketApi";

const AdminDashboard = () => {
    const [data, setData] = useState(null);
    const [tickets, setTickets] = useState([]);
    const [ticketId, setTicketId] = useState("");
    const [engineerId, setEngineerId] = useState("");

    useEffect(() => {
        const fetchDashboard = async () => {
            const token = localStorage.getItem("token");
            const [dashboardResponse, ticketsResponse] = await Promise.all([
                getDashboard(token),
                getAllTickets(token),
            ]);
            setData(dashboardResponse.data);
            setTickets(ticketsResponse.data);
        };

        fetchDashboard();
    }, []);

    const handleAssign = async () => {
        const token = localStorage.getItem("token");

        await assignTicket(ticketId, engineerId, token);
        setTickets((current) =>
            current.map((ticket) =>
                ticket.id === ticketId ? { ...ticket, status: "assigned" } : ticket,
            ),
        );
        alert("Assigned!");
    };

    return (
        <div className="min-h-screen bg-slate-100 px-6 py-10">
            <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-slate-900">Admin Dashboard</h2>
                <p className="mt-2 text-slate-600">
                    Admin-only control room for SLA monitoring and ticket-to-engineer assignment.
                </p>

                {data && (
                    <pre className="mt-6 overflow-auto rounded-2xl bg-slate-950 p-4 text-sm text-slate-100">
                        {JSON.stringify(data, null, 2)}
                    </pre>
                )}

                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-slate-900">All Tickets</h3>
                    <div className="mt-4 space-y-3">
                        {tickets.map((ticket) => (
                            <div key={ticket.id} className="rounded-2xl border border-slate-200 p-4 text-left">
                                <div className="flex items-center justify-between gap-4">
                                    <p className="font-semibold text-slate-900">{ticket.issue_type}</p>
                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{ticket.status}</span>
                                </div>
                                <p className="mt-2 text-sm text-slate-600">{ticket.description}</p>
                                <p className="mt-2 text-xs text-slate-500">Ticket ID: {ticket.id}</p>
                                <p className="mt-1 text-xs text-slate-500">Customer ID: {ticket.user_id}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <h3 className="mt-8 text-xl font-semibold text-slate-900">Assign Ticket</h3>

                <div className="mt-4 space-y-4">
                    <input
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        placeholder="Ticket ID"
                        onChange={(e) => setTicketId(e.target.value)}
                    />

                    <input
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        placeholder="Engineer ID"
                        onChange={(e) => setEngineerId(e.target.value)}
                    />

                    <button className="rounded-xl bg-amber-500 px-5 py-3 font-medium text-slate-950" onClick={handleAssign}>
                        Assign
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
