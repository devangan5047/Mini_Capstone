import { Navigate, Outlet } from "react-router-dom";
import { useAuthSession } from "../utils/auth";

const ProtectedRoute = ({ allowedRoles }) => {
    const session = useAuthSession();

    if (!session.isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (!allowedRoles.includes(session.role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
