import { useState } from "react";
import { createTicket } from "../api/ticketApi";

const ReportIssue = () => {
    const [issueType, setIssueType] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async () => {
        const token = localStorage.getItem("token");

        await createTicket({ issue_type: issueType, description }, token);
        alert("Ticket Created");
    };

    return (
        <div className="min-h-screen bg-slate-100 px-6 py-10">
            <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-slate-900">Report Issue</h2>
                <p className="mt-2 text-slate-600">
                    Customer access only. Log outages, signal drops, or complaint-driven service issues.
                </p>

                <div className="mt-6 space-y-4">
                    <input
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        placeholder="Issue type"
                        onChange={(e) => setIssueType(e.target.value)}
                    />

                    <textarea
                        className="min-h-36 w-full rounded-xl border border-slate-300 px-4 py-3"
                        placeholder="Description"
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <button className="rounded-xl bg-sky-600 px-5 py-3 font-medium text-white" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReportIssue;
