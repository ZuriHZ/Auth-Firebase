// ------------------------------------------------
// SIDEBAR — Panel de navegación lateral
// ------------------------------------------------
//
// Sidebar colapsable con animación de Framer Motion.
// Se muestra siempre en desktop y como overlay en mobile.
//
// FUNCIONAMIENTO:
//   - isOpen: controla si está expandida (256px) o contraída (64px)
//   - En mobile (< md): cuando está abierta, un overlay
//     semitransparente cubre el fondo. Al tocarlo, se cierra.
//   - En desktop: tiene un botón toggle con icono de chevron
//     que rota 180° cuando está contraída
//
// FILTRO POR ROL:
//   El array navItems tiene adminOnly: true/false. Si el usuario
//   NO es admin, se filtran los items adminOnly=true.
//   Así un usuario común ve Dashboard, Proyectos, Auth Lab, etc.
//   pero NO ve Base de Datos, Funciones ni Usuarios.
//
// ACTIVE STATE:
//   Compara location.pathname con item.path. Maneja el caso de
//   rutas hijas (ej: /dashboard/docs coincide con el item Dashboard).

import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  Shield,
  Database,
  Code2,
  Settings,
  BookOpen,
  ChevronLeft,
  Flame,
  Users,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const { userRole } = useAuth();
  const isAdmin = userRole === "admin";

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard, adminOnly: false },
    { name: "Proyectos", path: "/projects", icon: FolderKanban, adminOnly: false },
    { name: "Auth Lab", path: "/auth-lab", icon: Shield, adminOnly: false },
    { name: "Base de Datos", path: "/database", icon: Database, adminOnly: true },
    { name: "Funciones", path: "/functions", icon: Code2, adminOnly: true },
    { name: "Usuarios", path: "/admin/usuarios", icon: Users, adminOnly: true },
    { name: "Ajustes", path: "/settings", icon: Settings, adminOnly: false },
    { name: "Documentación", path: "/dashboard/docs", icon: BookOpen, adminOnly: false },
  ].filter((item) => !item.adminOnly || isAdmin);

  return (
    <>
      {/* Overlay semitransparente para mobile cuando el sidebar está abierto */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed md:sticky top-0 left-0 z-50 h-screen max-h-screen bg-sidebar border-r border-sidebar-border flex flex-col shrink-0 self-start ${
          isOpen ? "w-64" : "w-0 md:w-16"
        } overflow-hidden transition-[width] duration-300`}
      >
        <div
          className={`flex items-center h-20 border-b border-sidebar-border shrink-0 ${
            !isOpen ? "md:px-0 md:justify-center" : "px-4"
          }`}
        >
          <Link
            to="/"
            title="Ir a la página principal"
            className="flex items-center gap-2.5 group shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-sidebar-primary/20 flex items-center justify-center group-hover:bg-sidebar-primary/30 transition-colors">
              <Flame className="w-5 h-5 text-sidebar-primary" />
            </div>
            <span
              className={`text-headline-md font-headline-lg text-sidebar-foreground whitespace-nowrap ${
                !isOpen ? "md:hidden" : ""
              }`}
            >
              FireLabs
            </span>
          </Link>
        </div>

        <nav className="flex-1 py-4 space-y-1 overflow-y-auto overflow-x-hidden min-h-0">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path !== "/dashboard" &&
                location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 py-2.5 rounded-lg transition-all group ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground border border-sidebar-border"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                } ${!isOpen ? "md:px-0 md:justify-center md:gap-0" : "px-3"}`}
                title={item.name}
              >
                <item.icon
                  className={`w-5 h-5 flex-shrink-0 ${
                    isActive
                      ? "text-sidebar-primary"
                      : "group-hover:text-sidebar-primary"
                  } transition-colors`}
                />
                <span
                  className={`text-body-sm font-medium whitespace-nowrap ${
                    !isOpen ? "md:hidden" : ""
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Botón toggle para colapsar/expandir el sidebar */}
        <button
          onClick={onToggle}
          className="hidden md:flex items-center justify-center h-12 shrink-0 border-t border-sidebar-border text-sidebar-foreground hover:text-sidebar-primary hover:bg-sidebar-accent/50 transition-colors"
        >
          <ChevronLeft
            className={`w-5 h-5 transition-transform duration-300 ${
              !isOpen && "rotate-180"
            }`}
          />
        </button>
      </aside>
    </>
  );
};
