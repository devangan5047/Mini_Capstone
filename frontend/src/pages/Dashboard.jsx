import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../api/authApi";
import { clearAuthSession, getDefaultRouteForRole, setAuthSession, useAuthSession } from "../utils/auth";

const roleDetails = {
    customer: {
        title: "Customer",
        accent: "bg-sky-600 text-white",
        summary: "Raise network concerns and track your own complaint tickets.",
    },
    engineer: {
        title: "Engineer",
        accent: "bg-emerald-600 text-white",
        summary: "Update ticket status and close field incidents with resolution notes.",
    },
    admin: {
        title: "Admin",
        accent: "bg-amber-400 text-slate-950",
        summary: "View all tickets, monitor SLA trends, and assign work across teams.",
    },
};

const emptyForm = {
    name: "",
    email: "",
    password: "",
};

const AuthPanel = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState("login");
    const [selectedRole, setSelectedRole] = useState("customer");
    const [form, setForm] = useState(emptyForm);
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const currentRole = useMemo(() => roleDetails[selectedRole], [selectedRole]);

    const submit = async () => {
        setSubmitting(true);
        setMessage("");

        try {
            if (mode === "register") {
                await registerUser({ ...form, role: selectedRole });
            }

            const response = await loginUser({
                email: form.email,
                password: form.password,
            });

            setAuthSession(response.data.access_token);
            navigate(getDefaultRouteForRole(response.data.role), { replace: true });
        } catch (error) {
            setMessage(error?.response?.data?.detail ?? "Authentication failed");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-left text-white shadow-2xl">
            <div className="flex flex-wrap gap-3">
                {Object.entries(roleDetails).map(([role, details]) => (
                    <button
                        key={role}
                        className={`rounded-full px-4 py-2 text-sm font-semibold ${selectedRole === role ? details.accent : "bg-white/10 text-white"}`}
                        onClick={() => setSelectedRole(role)}
                    >
                        {details.title}
                    </button>
                ))}
            </div>

            <div className="mt-6 rounded-3xl bg-white/5 p-5">
                <p className="text-sm uppercase tracking-[0.28em] text-sky-300">{currentRole.title} Access</p>
                <p className="mt-3 text-sm leading-6 text-slate-200">{currentRole.summary}</p>
            </div>

            <div className="mt-6 flex gap-3 text-sm">
                <button
                    className={`rounded-full px-4 py-2 font-medium ${mode === "login" ? "bg-white text-slate-950" : "bg-white/10 text-white"}`}
                    onClick={() => setMode("login")}
                >
                    Sign In
                </button>
                <button
                    className={`rounded-full px-4 py-2 font-medium ${mode === "register" ? "bg-white text-slate-950" : "bg-white/10 text-white"}`}
                    onClick={() => setMode("register")}
                >
                    Register + Sign In
                </button>
            </div>

            <div className="mt-6 space-y-4">
                {mode === "register" && (
                    <input
                        className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none"
                        placeholder="Full name"
                        value={form.name}
                        onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                    />
                )}
                <input
                    className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none"
                    placeholder="Email"
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                />
                <input
                    className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none"
                    placeholder="Password"
                    type="password"
                    value={form.password}
                    onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                />
                <button
                    className={`w-full rounded-2xl px-5 py-3 font-semibold ${currentRole.accent}`}
                    disabled={submitting}
                    onClick={submit}
                >
                    {submitting ? "Working..." : mode === "login" ? `Sign In as ${currentRole.title}` : `Create ${currentRole.title} Account`}
                </button>
                {message && <p className="text-sm text-rose-300">{message}</p>}
            </div>
        </div>
    );
};

const Dashboard = () => {
    const { isAuthenticated, role } = useAuthSession();

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#e0f2fe,_#f8fafc_45%,_#e2e8f0)] px-6 py-10">
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.2fr_0.9fr]">
                <div className="rounded-[2rem] bg-white p-8 shadow-xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">
                        Telecom Network Platform
                    </p>
                    <h1 className="mt-3 text-4xl font-bold text-slate-900">
                        One sign-in hub for customer concerns, engineer action, and admin visibility.
                    </h1>
                    <p className="mt-4 max-w-2xl text-slate-600">
                        Customers raise concerns, engineers update ticket status, and admins oversee the complete telecom
                        operations flow from one dashboard.
                    </p>

                    <div className="mt-8 grid gap-4 md:grid-cols-3">
                        <div className="rounded-3xl bg-sky-50 p-5 text-left">
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">Customer</p>
                            <p className="mt-3 text-sm text-slate-700">Create concern tickets for outages, signal drops, and service complaints.</p>
                        </div>
                        <div className="rounded-3xl bg-emerald-50 p-5 text-left">
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Engineer</p>
                            <p className="mt-3 text-sm text-slate-700">Work assigned incidents and mark status updates with fix notes.</p>
                        </div>
                        <div className="rounded-3xl bg-amber-50 p-5 text-left">
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Admin</p>
                            <p className="mt-3 text-sm text-slate-700">View everything, track SLA metrics, and assign tickets to the field team.</p>
                        </div>
                    </div>

                    {isAuthenticated && (
                        <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-5 text-left">
                            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Current Session</p>
                            <p className="mt-2 text-xl font-semibold text-slate-900">Signed in as {role}</p>
                            <div className="mt-4 flex flex-wrap gap-3">
                                {role === "customer" && (
                                    <>
                                        <Link className="rounded-2xl bg-sky-600 px-5 py-3 font-medium text-white" to="/report">
                                            Raise Concern
                                        </Link>
                                        <Link className="rounded-2xl bg-slate-900 px-5 py-3 font-medium text-white" to="/tickets">
                                            View My Tickets
                                        </Link>
                                    </>
                                )}
                                {role === "engineer" && (
                                    <Link className="rounded-2xl bg-emerald-600 px-5 py-3 font-medium text-white" to="/engineer">
                                        Update Ticket Status
                                    </Link>
                                )}
                                {role === "admin" && (
                                    <Link className="rounded-2xl bg-amber-400 px-5 py-3 font-medium text-slate-950" to="/admin">
                                        View Everything
                                    </Link>
                                )}
                                <button
                                    className="rounded-2xl border border-slate-300 px-5 py-3 font-medium text-slate-700"
                                    onClick={() => clearAuthSession()}
                                >
                                    Log Out
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <AuthPanel />
            </div>
        </div>
    );
};

export default Dashboard;
