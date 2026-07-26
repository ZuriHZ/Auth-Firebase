// ------------------------------------------------
// PROTECTED ROUTE (Ruta Protegida)
// ------------------------------------------------
//
// Función: envolver páginas que requieren autenticación.
//
// FLUJO DE DECISIÓN (caja de seguridad):
//   1. ¿Firebase todavía está verificando la sesión?
//      -> spinner de carga (evita flash de redirect)
//   2. ¿No hay usuario logueado?
//      -> redirect a "/" (home)
//   3. ¿Hay usuario pero email NO verificado?
//      -> redirect a "/verify-email"
//      (excepto cuentas demo, que no pueden verificar email)
//   4. Todo ok -> renderiza el contenido (children)
//
// PATRÓN COMPOUND COMPONENT:
// ProtectedRoute envuelve a su hijo. No agrega UI propia,
// solo decide si mostrar <children> o hacer un redirect.
// Así cualquier página se protege simplemente con:
//   <ProtectedRoute><MiPagina /></ProtectedRoute>

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { DEMO_ACCOUNTS } from "../lib/demoAuth";

const demoEmails = DEMO_ACCOUNTS.map((a) => a.email);

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }
    if (!user) {
        return <Navigate to="/" />;
    }

    const isDemo = user.email && demoEmails.includes(user.email);
    if (!user.emailVerified && !isDemo) {
        return <Navigate to="/verify-email" />;
    }

    return children;
};
