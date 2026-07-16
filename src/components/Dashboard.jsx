import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { db } from "../firebase/firebase";
import { ref, get } from "firebase/database";
import {
  Users,
  Shield,
  Database,
  Activity,
  ArrowUpRight,
  UserPlus,
  ChevronRight,
} from "lucide-react";

export const Dashboard = () => {
  const { user, userRole } = useAuth();
  const isAdmin = userRole === "admin";
  const [totalUsers, setTotalUsers] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const snapshot = await get(ref(db, "usuarios"));
        if (snapshot.exists()) {
          const data = snapshot.val();
          setTotalUsers(Object.keys(data).length);
        }
      } catch {
        /* no-op */
      }
    };
    if (isAdmin) fetchStats();
  }, [isAdmin]);

  const adminStats = [
    {
      label: "Usuarios Registrados",
      value: totalUsers ?? "—",
      icon: Users,
      color: "text-secondary",
      bg: "bg-secondary/10",
    },
    {
      label: "Métodos de Auth",
      value: "3",
      icon: Shield,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },
    {
      label: "Servicios Firebase",
      value: "6",
      icon: Database,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Sesiones Activas",
      value: "—",
      icon: Activity,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
  ];

  const userStats = [
    {
      label: "Proyectos",
      value: "1",
      icon: Database,
      color: "text-secondary",
      bg: "bg-secondary/10",
    },
    {
      label: "Auth Requests",
      value: "—",
      icon: Shield,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },
  ];

  const stats = isAdmin ? adminStats : userStats;

  const adminActions = [
    {
      label: "Gestionar Usuarios",
      desc: "Ver, agregar y eliminar usuarios de Firebase",
      href: "/admin/usuarios",
      icon: Users,
    },
    {
      label: "Base de Datos",
      desc: "Explorar y administrar la Realtime Database",
      href: "/database",
      icon: Database,
    },
  ];

  return (
    <DashboardLayout>
      {/* Welcome */}
      <div className="mb-10">
        <h1 className="text-headline-lg md:text-display-lg font-display-lg text-on-surface mb-2">
          Bienvenido,{" "}
          <span className="fire-text">{user?.displayName || "Usuario"}</span>
        </h1>
        <p className="text-body-lg text-on-surface-variant">
          {isAdmin
            ? "Panel de administración de FireLabs"
            : "Tu panel de control en FireLabs"}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 p-5 md:p-6 hover:border-outline-variant/40 transition-all"
          >
            <div
              className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-4`}
            >
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="text-2xl md:text-3xl font-display-lg text-on-surface mb-1">
              {stat.value}
            </div>
            <div className="text-body-sm text-on-surface-variant">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Admin Quick Actions */}
      {isAdmin && (
        <div className="mb-10">
          <h2 className="text-headline-md font-headline-md text-on-surface mb-6 flex items-center gap-2">
            <ArrowUpRight className="w-5 h-5 text-secondary" />
            Acciones Rápidas
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {adminActions.map((action) => (
              <Link
                key={action.label}
                to={action.href}
                className="flex items-start gap-4 p-5 bg-surface-container-lowest rounded-2xl border border-outline-variant/20 hover:border-secondary/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/20 transition-colors">
                  <action.icon className="w-6 h-6 text-secondary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-label-md font-label-md text-on-surface mb-1">
                    {action.label}
                  </h3>
                  <p className="text-body-sm text-on-surface-variant">
                    {action.desc}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-on-surface-variant flex-shrink-0 mt-1 group-hover:text-secondary group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Quick Links */}
      <div>
        <h2 className="text-headline-md font-headline-md text-on-surface mb-6">
          Acceso Rápido
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Auth Lab", href: "/auth-lab", icon: Shield },
            { label: "Documentación", href: "/docs", icon: Database },
            { label: "Ajustes", href: "/settings", icon: Activity },
            ...(isAdmin
              ? [{ label: "Admin", href: "/admin/usuarios", icon: Users }]
              : []),
          ].map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="flex flex-col items-center gap-2 p-5 rounded-xl bg-surface-container-lowest border border-outline-variant/20 hover:border-secondary/30 transition-all group"
            >
              <link.icon className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform" />
              <span className="text-body-sm font-medium text-on-surface">
                {link.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};
