import { BookOpen, Flame, LogOut, PanelLeft, PanelLeftClose, PanelRightClose, PanelRightOpen, Settings, User as UserIcon, Search, Bell, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(() => {
        const saved = localStorage.getItem("firelabs-sidebar");
        if (saved !== null) return saved === "true";
        const appearance = localStorage.getItem("firelabs-appearance");
        if (appearance) {
            try { return !JSON.parse(appearance).sidebarCollapsed; } catch {
                // ignore malformed data
            }
        }
        return true;
    });
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    useEffect(() => {
        localStorage.setItem("firelabs-sidebar", String(sidebarOpen));
    }, [sidebarOpen]);

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

            {/* Toggle button */}
            <button
                type="button"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden md:flex fixed z-70 items-center justify-center transition-all duration-200 hover:scale-110 active:scale-90"
                style={{ left: sidebarOpen ? "16rem" : "4rem", top: "20px" }}
                title={sidebarOpen ? "Cerrar sidebar" : "Abrir sidebar"}
            >
                {sidebarOpen ? <PanelRightOpen className="w-6 h-6 text-on-surface-variant/40 hover:text-on-surface-variant" /> : <PanelRightClose className="w-6 h-6 text-on-surface-variant/40 hover:text-on-surface-variant" />}
            </button>

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="sticky top-0 z-60 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/20">
                    <div className="flex items-center justify-between h-16 px-4 md:px-6 gap-3">
                        {/* Mobile: logo + menu */}
                        <div className="flex items-center gap-2 md:hidden">
                            <button type="button" onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-surface-container-low transition-colors">
                                {sidebarOpen ? <PanelLeftClose className="w-5 h-5 text-on-surface-variant" /> : <PanelLeft className="w-5 h-5 text-on-surface-variant" />}
                            </button>
                            <Flame className="w-5 h-5 text-secondary" />
                            <span className="text-headline-md font-headline-lg text-on-surface">FireLabs</span>
                        </div>

                        {/* Search bar */}
                        <div className="hidden md:flex flex-1 max-w-md mx-auto">
                            <div className="relative w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/40" />
                                <input
                                    type="text"
                                    placeholder="Buscar..."
                                    className="w-full h-9 pl-9 pr-12 rounded-lg bg-surface-container-low border border-outline-variant/20 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/10 transition-all duration-200"
                                />
                                <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded-md bg-surface-container text-[10px] font-medium text-on-surface-variant/50 border border-outline-variant/20 leading-none">⌘K</kbd>
                            </div>
                        </div>

                        {/* Right section */}
                        <div className="flex items-center gap-1.5">
                            {/* New project button */}
                            <Link to="/projects" className="hidden md:inline-flex items-center gap-1.5 px-3.5 h-9 rounded-lg bg-primary text-white text-sm font-medium hover:opacity-90 active:scale-[0.97] transition-all duration-150 shadow-sm shadow-primary/20">
                                <Plus className="w-4 h-4" />
                                Nuevo Proyecto
                            </Link>

                            {/* Mobile: New project icon */}
                            <Link to="/projects" className="md:hidden p-2 rounded-lg hover:bg-surface-container-low transition-colors">
                                <Plus className="w-5 h-5 text-on-surface-variant" />
                            </Link>

                            {/* Notifications */}
                            <button type="button" className="relative p-2 rounded-lg hover:bg-surface-container-low transition-colors" title="Notificaciones">
                                <Bell className="w-5 h-5 text-on-surface-variant" />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary ring-2 ring-surface" />
                            </button>

                            {/* Avatar dropdown */}
                            {user && (
                                <div className="relative" ref={dropdownRef}>
                                    <button type="button" onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 hover:bg-surface-container-low p-1.5 pr-2 rounded-full transition-colors duration-150 border border-transparent hover:border-outline-variant/20">
                                        <div className="w-8 h-8 rounded-full bg-secondary/15 flex items-center justify-center border border-outline-variant/30 overflow-hidden">
                                            {user.photoURL ? <img src={user.photoURL} alt="" className="w-full h-full object-cover" /> : <UserIcon className="w-4 h-4 text-secondary" />}
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

                                            <div className="h-px bg-outline-variant/10 my-2" />

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
