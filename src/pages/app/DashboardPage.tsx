import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { db } from "../../firebase/firebase";
import { ref, get } from "firebase/database";
import {
  Users,
  Shield,
  Database,
  Activity,
  Plus,
  ChevronRight,
  Clock,
  FolderKanban,
  Key,
  LogIn,
  Rocket,
  UserPlus,
} from "lucide-react";

const timeAgo = (date: Date) => {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 60) return `hace ${mins} min`;
  if (hours < 24) return `hace ${hours}h`;
  return `hace ${days}d`;
};

interface ActivityItem {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  time: Date;
  color: string;
}

const recentActivity: ActivityItem[] = [
  { icon: FolderKanban, text: "Nuevo proyecto creado", time: new Date(Date.now() - 3 * 3600000), color: "text-secondary" },
  { icon: UserPlus, text: "Nuevo usuario registrado", time: new Date(Date.now() - 5 * 3600000), color: "text-cyan-400" },
  { icon: Key, text: "API Key generada", time: new Date(Date.now() - 24 * 3600000), color: "text-emerald-400" },
  { icon: LogIn, text: "Inicio de sesión desde nueva ubicación", time: new Date(Date.now() - 26 * 3600000), color: "text-purple-400" },
  { icon: Rocket, text: "Deploy realizado en producción", time: new Date(Date.now() - 48 * 3600000), color: "text-amber-400" },
];

export const Dashboard = () => {
  const { user, userRole } = useAuth();
  const isAdmin = userRole === "admin";
  const [totalUsers, setTotalUsers] = useState<number | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const snapshot = await get(ref(db, "usuarios"));
        if (snapshot.exists()) {
          setTotalUsers(Object.keys(snapshot.val()).length);
        }
      } catch {
        /* no-op */
      }
    };
    if (isAdmin) fetchStats();
  }, [isAdmin]);

  const adminStats = [
    { label: "Usuarios", value: totalUsers ?? "—", icon: Users, color: "text-secondary", bg: "bg-secondary/10" },
    { label: "Auth Methods", value: "3", icon: Shield, color: "text-cyan-400", bg: "bg-cyan-500/10" },
    { label: "Firebase Services", value: "6", icon: Database, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { label: "Active Sessions", value: "—", icon: Activity, color: "text-purple-400", bg: "bg-purple-500/10" },
  ];

  const userStats = [
    { label: "Proyectos", value: "1", icon: Database, color: "text-secondary", bg: "bg-secondary/10" },
    { label: "Auth Requests", value: "—", icon: Shield, color: "text-cyan-400", bg: "bg-cyan-500/10" },
  ];

  const stats = isAdmin ? adminStats : userStats;

  const quickActions = isAdmin
    ? [
        { label: "Gestionar Usuarios", desc: "Ver y administrar usuarios", href: "/admin/usuarios", icon: Users },
        { label: "Base de Datos", desc: "Explorar Realtime Database", href: "/database", icon: Database },
        { label: "Auth Lab", desc: "Probar métodos de autenticación", href: "/auth-lab", icon: Shield },
        { label: "Configuración", desc: "Ajustes de la plataforma", href: "/settings", icon: Activity },
      ]
    : [
        { label: "Auth Lab", desc: "Probar métodos de autenticación", href: "/auth-lab", icon: Shield },
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

      {/* Stats bar */}
      <div className={`grid grid-cols-2 ${isAdmin ? "md:grid-cols-4" : "md:grid-cols-2"} gap-3 mb-8`}>
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
                <div className="text-xl leading-none font-display-lg text-on-surface mb-0.5">
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
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-outline-variant/10">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-secondary" />
                <h2 className="text-sm font-semibold text-on-surface">Actividad Reciente</h2>
              </div>
              <button
                type="button"
                className="text-xs font-medium text-on-surface-variant/60 hover:text-on-surface-variant transition-colors"
              >
                Ver todo
              </button>
            </div>
            <div className="p-2">
              {recentActivity.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-container transition-all duration-150 cursor-pointer group"
                >
                  <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-150">
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-on-surface truncate">{item.text}</p>
                  </div>
                  <span className="text-[11px] text-on-surface-variant/50 whitespace-nowrap font-medium">
                    {timeAgo(item.time)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 overflow-hidden">
            <div className="px-5 py-4 border-b border-outline-variant/10">
              <h2 className="text-sm font-semibold text-on-surface">Accesos Directos</h2>
            </div>
            <div className="p-2">
              {quickActions.map((action) => (
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
        </div>
      </div>
    </DashboardLayout>
  );
};
