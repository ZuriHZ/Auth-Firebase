import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import type { AuthToken } from "../types";

interface TokenCardProps {
  token: AuthToken;
  delay?: number;
}

export const TokenCard: React.FC<TokenCardProps> = ({ token, delay = 0 }) => {
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 p-5 md:p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
          <Shield className="w-5 h-5 text-secondary" />
        </div>
        <h4 className="text-headline-md font-headline-md text-on-surface">
          Token JWT
        </h4>
      </div>

      <div className="space-y-0 mb-4">
        <InfoRow label="Tipo" value={token.type} />
        <InfoRow label="Issuer" value={token.issuer} />
        <InfoRow label="Emitido" value={formatDate(token.issuedAt)} />
        <InfoRow
          label="Expira"
          value={formatDate(token.expiresAt)}
          isLast
        />
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-body-sm text-on-surface-variant">Estado:</span>
        <span
          className={`text-body-xs px-2 py-0.5 rounded-full font-medium ${
            token.isExpired
              ? "bg-error/10 text-error"
              : "bg-success/10 text-success"
          }`}
        >
          {token.isExpired ? "Expirado" : "Vigente"}
        </span>
      </div>

      <div>
        <span className="text-body-sm text-on-surface-variant block mb-2">
          Raw Token
        </span>
        <div className="font-mono text-body-xs bg-surface rounded-lg p-3 break-all select-all border border-outline-variant/10 max-h-24 overflow-y-auto">
          {token.raw}
        </div>
      </div>
    </motion.div>
  );
};

const InfoRow = ({ label, value, isLast = false }: { label: string; value: string; isLast?: boolean }) => (
  <div className={`flex items-center justify-between py-3 ${!isLast ? "border-b border-outline-variant/10" : ""}`}>
    <span className="text-body-sm text-on-surface-variant">{label}</span>
    <span className="text-body-sm font-medium text-on-surface bg-surface-container px-3 py-1 rounded-lg border border-outline-variant/10">
      {value}
    </span>
  </div>
);
