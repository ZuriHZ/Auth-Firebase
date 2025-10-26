// src/components/AdminRoute.jsx
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

// Componente para rutas que requieren solo ser admin
export const AdminRoute = ({ children }) => {
    const { user, userRole, loading } = useAuth();

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

    // Si el usuario no es admin, redirige al dashboard
    if (userRole !== "admin") {
        return (
            <Navigate to="/dashboard" replace />
        );
    }

    return children;
};

// Componente para rutas que cualquier usuario autenticado puede ver
// pero con controles limitados según el rol
export const ProtectedDatabaseRoute = ({ children }) => {
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

    // Cualquier usuario autenticado puede acceder
    return children;
};
