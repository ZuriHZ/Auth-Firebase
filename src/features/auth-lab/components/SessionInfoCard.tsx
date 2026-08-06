import { motion } from "framer-motion";
import { UserCircle } from "lucide-react";
import type { SessionInfo } from "../types";

interface SessionInfoCardProps {
  session: SessionInfo;
  delay?: number;
}

export const SessionInfoCard: React.FC<SessionInfoCardProps> = ({ session, delay = 0 }) => {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 p-5 md:p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
          <UserCircle className="w-5 h-5 text-secondary" />
        </div>
        <h4 className="text-headline-md font-headline-md text-on-surface">
          Sesión Actual
        </h4>
      </div>

      <div className="space-y-0">
        <InfoRow label="UID" value={session.uid} />
        <InfoRow label="Email" value={session.email} />
        <InfoRow label="Nombre" value={session.displayName} />
        <InfoRow label="Rol" value={session.rol} />
        <InfoRow label="Email verificado" value={session.emailVerified ? "Sí" : "No"} />
        <InfoRow label="Demo" value={session.isDemo ? "Sí" : "No"} />
        <InfoRow label="Creado" value={formatDate(session.createdAt)} isLast />
        <InfoRow label="Último acceso" value={formatDate(session.lastSignIn)} isLast />
      </div>
    </motion.div>
  );
};

const InfoRow = ({ label, value, isLast = false }: { label: string; value: string; isLast?: boolean }) => (
  <div className={`flex items-center justify-between py-3 ${!isLast ? "border-b border-outline-variant/10" : ""}`}>
    <span className="text-body-sm text-on-surface-variant">{label}</span>
    <span className="text-body-sm font-medium text-on-surface bg-surface-container px-3 py-1 rounded-lg border border-outline-variant/10 max-w-[55%] truncate text-right">
      {value}
    </span>
  </div>
);
