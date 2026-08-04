import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  Shield,
  Database,
  Code2,
  Settings,
  BookOpen,
  Flame,
  Users,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const { userRole } = useAuth();
  const isAdmin = userRole === "admin";

  const mainNav: NavItem[] = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Proyectos", path: "/projects", icon: FolderKanban },
    { name: "Auth Lab", path: "/auth-lab", icon: Shield },
  ];

  const adminNav: NavItem[] = [
    { name: "Base de Datos", path: "/database", icon: Database },
    { name: "Funciones", path: "/functions", icon: Code2 },
    { name: "Usuarios", path: "/admin/usuarios", icon: Users },
  ];

  const bottomNav: NavItem[] = [
    { name: "Perfil", path: "/profile", icon: User },
    { name: "Ajustes", path: "/settings", icon: Settings },
    { name: "Documentación", path: "/dashboard/docs", icon: BookOpen },
  ];

  const isActivePath = (path: string) => {
    if (path === "/dashboard") return location.pathname === "/dashboard";
    return location.pathname.startsWith(path);
  };

  const NavItemLink: React.FC<{ item: NavItem }> = ({ item }) => {
    const active = isActivePath(item.path);
    return (
      <Link
        to={item.path}
        className={`relative flex items-center gap-3 py-2.5 rounded-lg transition-all duration-150 group ${
          active
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
        } ${!isOpen ? "md:px-0 md:justify-center" : "px-3"}`}
        title={item.name}
      >
        {active && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-sidebar-primary rounded-full transition-all" />
        )}
        <item.icon
          className={`w-5 h-5 shrink-0 ${
            active
              ? "text-sidebar-primary"
              : "text-sidebar-foreground group-hover:text-sidebar-primary"
          } transition-colors duration-150`}
        />
        <span
          className={`text-sm font-medium whitespace-nowrap tracking-wide ${
            !isOpen ? "md:hidden" : ""
          }`}
        >
          {item.name}
        </span>
      </Link>
    );
  };

  return (
    <>
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
            title="Volver al inicio"
            className="flex items-center gap-2.5 group shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-sidebar-primary/20 flex items-center justify-center group-hover:bg-sidebar-primary/30 group-hover:scale-105 transition-all duration-200">
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

        <nav className="flex-1 overflow-y-auto py-3">
          <div className={!isOpen ? "md:px-0" : "px-2"}>
            <div className="space-y-0.5">
              {mainNav.map((item) => (
                <NavItemLink key={item.path} item={item} />
              ))}
            </div>

            {isAdmin && adminNav.length > 0 && (
              <>
                <div className={`my-3 ${!isOpen ? "md:hidden" : "mx-2"}`}>
                  <div className="h-px bg-sidebar-border/40" />
                </div>
                <div className="space-y-0.5">
                  {adminNav.map((item) => (
                    <NavItemLink key={item.path} item={item} />
                  ))}
                </div>
              </>
            )}
          </div>
        </nav>

        <div
          className={`border-t border-sidebar-border/40 py-2 shrink-0 ${
            !isOpen ? "md:px-0" : "px-2"
          }`}
        >
          {bottomNav.map((item) => (
            <NavItemLink key={item.path} item={item} />
          ))}
        </div>

        {/* Version indicator */}
        <div
          className={`hidden md:flex items-center justify-center h-7 border-t border-sidebar-border/30 text-[10px] text-sidebar-foreground/30 shrink-0 ${
            !isOpen ? "" : "hidden"
          }`}
        >
          v1.0
        </div>
      </aside>
    </>
  );
};
