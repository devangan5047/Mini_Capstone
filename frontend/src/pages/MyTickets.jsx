import { useEffect, useState } from "react";
import { getMyTickets } from "../api/ticketApi";

const MyTickets = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchTickets = async () => {
            const token = localStorage.getItem("token");
            const res = await getMyTickets(token);
            setTickets(res.data);
        };

        fetchTickets();
    }, []);

    return (
        <div className="min-h-screen bg-slate-100 px-6 py-10">
            <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-slate-900">My Tickets</h2>

                <div className="mt-6 space-y-4">
                    {tickets.map((t) => (
                        <div key={t.id} className="rounded-2xl border border-slate-200 p-4">
                            <p className="font-semibold text-slate-900">{t.issue_type}</p>
                            <p className="mt-1 text-sm text-slate-600">{t.description}</p>
                            <p className="mt-3 text-sm font-medium text-slate-700">Status: {t.status}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyTickets;
