import { motion } from "framer-motion";
import { Fingerprint, Check, X } from "lucide-react";
import type { UserClaims } from "../types";

interface ClaimsCardProps {
  claims: UserClaims;
  delay?: number;
}

export const ClaimsCard: React.FC<ClaimsCardProps> = ({ claims, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 p-5 md:p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
          <Fingerprint className="w-5 h-5 text-secondary" />
        </div>
        <h4 className="text-headline-md font-headline-md text-on-surface">
          Claims
        </h4>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between py-3 border-b border-outline-variant/10">
          <span className="text-body-sm text-on-surface-variant">Rol</span>
          <span className="bg-secondary/10 text-secondary text-body-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
            {claims.rol}
          </span>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-outline-variant/10">
          <span className="text-body-sm text-on-surface-variant">Email verificado</span>
          <span
            className={`flex items-center gap-1.5 text-body-xs px-3 py-1 rounded-full font-medium ${
              claims.emailVerified
                ? "bg-success/10 text-success"
                : "bg-error/10 text-error"
            }`}
          >
            {claims.emailVerified ? <Check size={14} /> : <X size={14} />}
            {claims.emailVerified ? "Verificado" : "No verificado"}
          </span>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-outline-variant/10">
          <span className="text-body-sm text-on-surface-variant">Proveedor</span>
          <span className="text-body-sm font-medium text-on-surface bg-surface-container px-3 py-1 rounded-lg border border-outline-variant/10">
            {claims.provider}
          </span>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-outline-variant/10">
          <span className="text-body-sm text-on-surface-variant">MFA</span>
          <span
            className={`flex items-center gap-1.5 text-body-xs px-3 py-1 rounded-full font-medium ${
              claims.mfaEnabled
                ? "bg-success/10 text-success"
                : "bg-warning/10 text-warning"
            }`}
          >
            {claims.mfaEnabled ? "Activado" : "No configurado"}
          </span>
        </div>

        <div className="pt-2">
          <span className="text-body-sm text-on-surface-variant block mb-3">
            Custom Claims
          </span>
          <div className="flex flex-wrap gap-2">
            {claims.customClaims.length > 0 ? (
              claims.customClaims.map((cc) => (
                <span
                  key={cc.key}
                  className="bg-fire-accent/10 text-fire-accent text-body-xs px-3 py-1 rounded-full border border-fire-accent/20"
                >
                  {cc.key}: {cc.value}
                </span>
              ))
            ) : (
              <span className="text-body-sm text-on-surface-variant italic">
                Sin custom claims
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
