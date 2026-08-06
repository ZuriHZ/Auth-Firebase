import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { db } from "../../firebase/firebase";
import { ref, onValue } from "firebase/database";
import {
  Users,
  UserCheck,
  Shield,
  Mail,
  BadgeCheck,
  Plus,
  ChevronRight,
  Activity,
  Database,
} from "lucide-react";

interface UsuarioNode {
  nombre?: string;
  email?: string;
  rol?: string;
  activo?: boolean;
}

interface UsuarioRow extends UsuarioNode {
  uid: string;
}

export const Dashboard = () => {
  const { user, userRole, appUser } = useAuth();
  const isAdmin = userRole === "admin";
  const [usuarios, setUsuarios] = useState<UsuarioRow[] | null>(null);

  useEffect(() => {
    if (!isAdmin) {
      setUsuarios(null);
      return;
    }
    const usuariosRef = ref(db, "usuarios");
    const unsubscribe = onValue(
      usuariosRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val() as Record<string, UsuarioNode>;
          const list = Object.entries(data).map(([uid, val]) => ({
            uid,
            ...val,
          }));
          setUsuarios(list);
        } else {
          setUsuarios([]);
        }
      },
      (error) => {
        console.error("Error al leer usuarios:", error);
        setUsuarios(null);
      }
    );
    return () => unsubscribe();
  }, [isAdmin]);

  const totalUsers = usuarios?.length ?? null;
  const activeUsers = usuarios?.filter((u) => u.activo !== false).length ?? null;
  const adminCount = usuarios?.filter((u) => u.rol === "admin").length ?? null;
  const recentUsers = usuarios?.slice(0, 5) ?? [];

  const adminStats = [
    { label: "Usuarios", value: totalUsers ?? "—", icon: Users, color: "text-secondary", bg: "bg-secondary/10" },
    { label: "Usuarios Activos", value: activeUsers ?? "—", icon: UserCheck, color: "text-cyan-400", bg: "bg-cyan-500/10" },
    { label: "Admins", value: adminCount ?? "—", icon: Shield, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  ];

  const userStats = [
    { label: "Email", value: user?.email ?? "—", icon: Mail, color: "text-secondary", bg: "bg-secondary/10" },
    { label: "Rol", value: appUser?.rol ?? "usuario", icon: Shield, color: "text-cyan-400", bg: "bg-cyan-500/10" },
    { label: "Email verificado", value: user?.emailVerified ? "Sí" : "No", icon: BadgeCheck, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  ];

  const stats = isAdmin ? adminStats : userStats;

  const quickActions = isAdmin
    ? [
        { label: "Gestionar Usuarios", desc: "Ver y administrar usuarios", href: "/admin/usuarios", icon: Users },
        { label: "Base de Datos", desc: "Explorar Realtime Database", href: "/database", icon: Database },
        { label: "Auth Lab", desc: "Estado real de tu autenticación", href: "/auth-lab", icon: Shield },
        { label: "Configuración", desc: "Ajustes de la plataforma", href: "/settings", icon: Activity },
      ]
    : [
        { label: "Auth Lab", desc: "Estado real de tu autenticación", href: "/auth-lab", icon: Shield },
        { label: "Configuración", desc: "Ajustes de tu cuenta", href: "/settings", icon: Activity },
      ];

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="mb-8">
        <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-on-surface-variant/50 mb-1.5 block">
          Dashboard
        </span>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-headline-lg md:text-display-lg font-display-lg text-on-surface mb-1.5">
              Bienvenido,{" "}
              <span className="fire-text">{user?.displayName || "Usuario"}</span>
            </h1>
            <p className="text-body-md text-on-surface-variant">
              {isAdmin
                ? "Panel de administración de FireLabs"
                : "Tu panel de control en FireLabs"}
            </p>
          </div>
          <Link
            to="/projects"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90 active:scale-[0.97] transition-all duration-150 shadow-sm shadow-primary/20 shrink-0"
          >
            <Plus className="w-4 h-4" />
            Nuevo Proyecto
          </Link>
        </div>
      </div>

      {/* Stats bar (datos reales de Firebase) */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 px-4 py-3.5 hover:border-outline-variant/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center shrink-0`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div className="min-w-0">
                <div className="text-xl leading-none font-display-lg text-on-surface mb-0.5 truncate">
                  {stat.value}
                </div>
                <div className="text-[11px] text-on-surface-variant font-medium truncate">
                  {stat.label}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Two-column layout */}
      {isAdmin ? (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Usuarios registrados (reales) */}
          <div className="lg:col-span-2">
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-outline-variant/10">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-secondary" />
                  <h2 className="text-sm font-semibold text-on-surface">Usuarios Registrados</h2>
                </div>
                <Link
                  to="/database"
                  className="text-xs font-medium text-on-surface-variant/60 hover:text-on-surface-variant transition-colors"
                >
                  Ver todos
                </Link>
              </div>
              <div className="p-2">
                {usuarios === null ? (
                  <div className="text-center py-8 text-body-xs text-on-surface-variant">
                    No se pudo cargar el listado de usuarios
                  </div>
                ) : recentUsers.length === 0 ? (
                  <div className="text-center py-8 text-body-xs text-on-surface-variant">
                    No hay usuarios registrados
                  </div>
                ) : (
                  recentUsers.map((u) => (
                    <div
                      key={u.uid}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-container transition-all duration-150"
                    >
                      <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
                        {u.rol === "admin" ? (
                          <Shield className="w-4 h-4 text-secondary" />
                        ) : (
                          <Users className="w-4 h-4 text-secondary" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-on-surface truncate">
                          {u.nombre || "—"}
                        </p>
                        <p className="text-[11px] text-on-surface-variant/70 truncate">
                          {u.email}
                        </p>
                      </div>
                      <span
                        className={`text-[11px] px-2.5 py-1 rounded-full font-medium whitespace-nowrap ${
                          u.rol === "admin"
                            ? "bg-secondary/10 text-secondary"
                            : "bg-surface-container-low text-on-surface-variant"
                        }`}
                      >
                        {u.rol === "admin" ? "Admin" : "Usuario"}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <QuickActionsCard actions={quickActions} />
          </div>
        </div>
      ) : (
        /* Quick Actions a ancho completo (sin actividad mock) */
        <div className="max-w-md">
          <QuickActionsCard actions={quickActions} />
        </div>
      )}
    </DashboardLayout>
  );
};

const QuickActionsCard = ({ actions }: { actions: { label: string; desc: string; href: string; icon: React.ComponentType<{ className?: string }> }[] }) => (
  <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 overflow-hidden">
    <div className="px-5 py-4 border-b border-outline-variant/10">
      <h2 className="text-sm font-semibold text-on-surface">Accesos Directos</h2>
    </div>
    <div className="p-2">
      {actions.map((action) => (
        <Link
          key={action.label}
          to={action.href}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-container transition-all duration-150 group"
        >
          <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors duration-150">
            <action.icon className="w-4 h-4 text-secondary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-on-surface truncate">{action.label}</p>
            <p className="text-[11px] text-on-surface-variant/70 truncate">{action.desc}</p>
          </div>
          <ChevronRight className="w-4 h-4 text-on-surface-variant/30 group-hover:text-secondary group-hover:translate-x-0.5 transition-all duration-150 shrink-0" />
        </Link>
      ))}
    </div>
  </div>
);
