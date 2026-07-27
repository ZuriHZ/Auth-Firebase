// ------------------------------------------------
// DASHBOARD LAYOUT — Estructura base del dashboard
// ------------------------------------------------
//
// Layout principal para todas las páginas protegidas.
// Estructura: Sidebar | TopBar + Content (flex row)
//
// COMPONENTES:
//   - Sidebar: navegación lateral (colapsable)
//   - TopBar: barra superior con logo mobile + avatar + dropdown
//   - main: área de contenido donde se renderiza children
//
// DROPDOWN DE USUARIO:
//   - Muestra avatar (foto de Google o icono por defecto)
//   - Nombre, email, rol
//   - Links a Perfil, Ajustes, Documentación
//   - Botón de Cerrar Sesión
//   - Se cierra al hacer clic fuera (useRef + event listener)
//
// CLICK OUTSIDE PATTERN:
//   Se usa un useRef para el dropdown y un event listener en
//   document que verifica si el clic fue fuera del dropdown.
//   Si fue fuera, cierra el menú. El cleanup en el useEffect
//   remueve el listener al desmontar.

import { ArrowLeft, ArrowRight, BookOpen, Flame, LogOut, PanelLeft, PanelLeftClose, PanelLeftCloseIcon, PanelRight, PanelRightClose, PanelRightOpen, Settings, User as UserIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { user, userRole, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    const isAdmin = userRole === "admin";

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="h-screen bg-background flex overflow-hidden">
            <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

            {/* Toggle button - flota en la orilla entre sidebar y contenido */}
            <button type="button" onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden md:flex fixed z-70 px-2 rounded-lg transition-all" style={{ left: sidebarOpen ? "16rem" : "3rem", top: "20px" }} title={sidebarOpen ? "Cerrar sidebar" : "Abrir sidebar"}>
                {sidebarOpen ? <PanelRightOpen className="w-5 h-5 text-on-surface-variant cursor-pointer rounded-sm" /> : <PanelRightClose className="w-5 h-5  cursor-pointer rounded-sm" />}
            </button>

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="sticky top-0 z-60 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/20">
                    <div className="flex items-center justify-between h-16 px-4 md:px-6">
                        <div className="flex items-center gap-3 md:hidden">
                            <button type="button" onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-surface-container-low transition-colors" title={sidebarOpen ? "Cerrar sidebar" : "Abrir sidebar"}>
                                {sidebarOpen ? <PanelLeftClose className="w-5 h-5 text-on-surface-variant" /> : <PanelLeft className="w-5 h-5 text-on-surface-variant" />}
                            </button>
                            <Flame className="w-5 h-5 text-secondary" />
                            <span className="text-headline-md font-headline-lg text-on-surface">FireLabs</span>
                        </div>
                        {/* Spacer en desktop para equilibrar el botón flotante y mantener avatar a la derecha */}
                        <div className="hidden md:block w-10 shrink-0" />

                        <div className="flex items-center gap-4">
                            {user && (
                                <div className="relative" ref={dropdownRef}>
                                    <button type="button" onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-3 hover:bg-surface-container-low p-1.5 pr-3 rounded-full transition-colors border border-transparent hover:border-outline-variant/20">
                                        <div className="w-9 h-9 rounded-full bg-secondary/15 flex items-center justify-center border border-outline-variant/30 overflow-hidden">
                                            {user.photoURL ? <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" /> : <span className="material-symbols-outlined text-secondary text-xl">{isAdmin ? "admin_panel_settings" : "person"}</span>}
                                        </div>
                                        <div className="hidden sm:flex flex-col items-start">
                                            <span className="text-body-sm font-medium text-on-surface leading-tight">{user.displayName || "Usuario"}</span>
                                            <span className="text-[11px] text-on-surface-variant font-medium uppercase tracking-wider leading-tight">{isAdmin ? "Admin" : "Usuario"}</span>
                                        </div>
                                    </button>

                                    {dropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest border border-outline-variant/20 rounded-xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                            <div className="px-4 py-2 border-b border-outline-variant/10 mb-2">
                                                <p className="text-sm font-medium text-on-surface truncate">{user.displayName || "Usuario"}</p>
                                                <p className="text-xs text-on-surface-variant truncate">{user.email}</p>
                                            </div>

                                            <Link to="/profile" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors">
                                                <UserIcon className="w-4 h-4" />
                                                Mi Perfil
                                            </Link>
                                            <Link to="/settings" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors">
                                                <Settings className="w-4 h-4" />
                                                Ajustes
                                            </Link>
                                            <Link to="/dashboard/docs" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors">
                                                <BookOpen className="w-4 h-4" />
                                                Documentación
                                            </Link>

                                            <div className="h-px bg-outline-variant/10 my-2"></div>

                                            <div className="px-2 pb-2">
                                                <button type="button" onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-500 rounded-lg hover:bg-red-500/10 transition-colors">
                                                    <LogOut className="w-4 h-4" />
                                                    Cerrar Sesión
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <main className="flex-1 min-h-0 p-6 md:p-8 overflow-y-auto overflow-x-hidden">{children}</main>
            </div>
        </div>
    );
};
