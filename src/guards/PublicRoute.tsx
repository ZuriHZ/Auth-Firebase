// ------------------------------------------------
// PUBLIC ROUTE (Ruta Pública)
// ------------------------------------------------
//
// Es el inverso de ProtectedRoute. Se usa en páginas como
// /login y /register para evitar que un usuario YA logueado
// vea el formulario de login.
//
// FLUJO:
//   1. ¿Cargando? -> spinner
//   2. ¿Usuario logueado Y email verificado?
//      -> redirect al dashboard (no tiene sentido que
//         alguien ya autenticado vea el login)
//   3. Sino -> muestra la página pública (login/register)
//
// Sin este guard, un admin podría navegar a /login y ver
// el formulario, lo cual es confuso.

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (user && user.emailVerified) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
