// ------------------------------------------------
// PROTECTED ADMIN ROUTE (Ruta Solo Admin)
// ------------------------------------------------
//
// Extiende ProtectedRoute agregando verificación de ROL.
// Un usuario común (rol: "usuario") no puede acceder a
// rutas admin como /functions o /admin/usuarios.
//
// FLUJO COMPLETO:
//   1. ¿Cargando? -> spinner
//   2. ¿No hay sesión? -> redirect al home
//   3. ¿Rol NO es "admin"? -> redirect al dashboard
//      (el usuario común no puede ver páginas admin)
//   4. Todo ok -> renderiza children
//
// El rol se lee de la Realtime Database en AuthContext
// (usuarios/{uid}/rol), por lo que esta verificación
// depende de que el admin haya creado el nodo en la DB.

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, userRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" />;
  }

    // La verificación de email no bloquea el acceso para portafolio.

    if (userRole !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  return children;
};
