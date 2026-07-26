// ------------------------------------------------
// PROTECTED DATABASE ROUTE (Ruta de Base de Datos)
// ------------------------------------------------
//
// Similar a ProtectedRoute, pero redirige a /login en vez
// de /home, y NO verifica el rol (cualquier usuario
// autenticado puede acceder).
//
// ¿Por qué existe si ya tenemos ProtectedRoute?
// Porque la ruta /database muestra datos de la DB (tabla
// de usuarios). Originalmente se pensó para que cualquier
// usuario logueado pueda ver la lista, mientras que
// ProtectedAdminRoute es solo para admin.
//
// DIFERENCIA CLAVE con ProtectedRoute:
//   ProtectedRoute -> redirect a "/" (home)
//   ProtectedDatabaseRoute -> redirect a "/login" (login)
// Es sutíl pero intencional: la BD es un feature interno,
// así que si no estás autenticado te mandamos directo al login.

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { DEMO_ACCOUNTS } from "../lib/demoAuth";

const demoEmails = DEMO_ACCOUNTS.map((a) => a.email);

export const ProtectedDatabaseRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    const isDemo = user.email && demoEmails.includes(user.email);
    if (!user.emailVerified && !isDemo) {
        return <Navigate to="/verify-email" />;
    }

    return children;
};
