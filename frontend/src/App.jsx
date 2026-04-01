import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./pages/Dashboard";
import EngineerDashboard from "./pages/EngineerDashboard";
import MyTickets from "./pages/MyTickets";
import ReportIssue from "./pages/ReportIssue";
import ProtectedRoute from "./components/ProtectedRoute";
import { clearAuthSession, useAuthSession } from "./utils/auth";

const Navbar = () => {
    const { isAuthenticated, role } = useAuthSession();

    return (
        <div className="bg-slate-950 px-8 py-4 text-white shadow-lg">
            <div className="mx-auto flex max-w-6xl items-center justify-between">
                <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-sky-300">Telecom NOC</p>
                    <h1 className="text-2xl font-bold">Fault Operations Platform</h1>
                </div>

                <div className="flex gap-5 text-sm font-medium">
                    <Link to="/">Dashboard</Link>
                    {role === "customer" && <Link to="/report">Report Issue</Link>}
                    {role === "customer" && <Link to="/tickets">My Tickets</Link>}
                    {role === "engineer" && <Link to="/engineer">Engineer Panel</Link>}
                    {role === "admin" && <Link to="/admin">Admin Panel</Link>}
                    {isAuthenticated && (
                        <button
                            className="cursor-pointer rounded-full border border-white/20 px-3 py-1"
                            onClick={() => clearAuthSession()}
                        >
                            Log Out
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Dashboard />} />

                <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
                    <Route path="/report" element={<ReportIssue />} />
                    <Route path="/tickets" element={<MyTickets />} />
                </Route>

                <Route element={<ProtectedRoute allowedRoles={["engineer"]} />}>
                    <Route path="/engineer" element={<EngineerDashboard />} />
                </Route>

                <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                    <Route path="/admin" element={<AdminDashboard />} />
                </Route>
            </Routes>
        </Router>
    );
}
