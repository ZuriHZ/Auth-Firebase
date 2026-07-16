import { useState } from "react";
import { Menu, LogOut, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../Sidebar";
import { useAuth } from "../../context/AuthContext";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, userRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const isAdmin = userRole === "admin";

  return (
    <div className="min-h-screen bg-background flex overflow-x-hidden">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/20">
          <div className="flex items-center justify-between h-16 px-4 md:px-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-surface-container-low transition-colors"
              >
                <Menu className="w-6 h-6 text-on-surface" />
              </button>
              <div className="flex items-center gap-2 md:hidden">
                <Flame className="w-5 h-5 text-secondary" />
                <span className="text-headline-md font-headline-lg text-on-surface">
                  FireLabs
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {user && (
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="text-body-sm font-medium text-on-surface">
                      {user.displayName || "Usuario"}
                    </span>
                    <span className="text-[11px] text-on-surface-variant font-medium uppercase tracking-wider">
                      {isAdmin ? "Admin" : "Usuario"}
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-secondary/15 flex items-center justify-center border border-outline-variant/30">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="Avatar"
                        className="w-9 h-9 rounded-full object-cover"
                      />
                    ) : (
                      <span className="material-symbols-outlined text-secondary text-xl">
                        {isAdmin ? "admin_panel_settings" : "person"}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-xl bg-error/10 text-error hover:bg-error/20 transition-all active:scale-95"
                    title="Cerrar sesión"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};
