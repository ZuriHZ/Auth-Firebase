// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }
    // Si no hay usuario, redirige al login
    if (!user) {
        return <Navigate to="/login" />;
    }

    // Si el usuario no ha verificado su email, redirige a verificación
    if (!user.emailVerified) {
        return <Navigate to="/verify-email" />;
    }

    return children;
};
