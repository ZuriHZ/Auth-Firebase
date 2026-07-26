import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Key, Smartphone, LogOut } from "lucide-react";
import { mockSecurity } from "../data/mock";

export const SecuritySection: React.FC = () => {
  const [twoFactor, setTwoFactor] = useState(mockSecurity.twoFactorEnabled);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 p-5 md:p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
          <Shield className="w-5 h-5 text-secondary" />
        </div>
        <h2 className="text-headline-md font-headline-md text-on-surface">
          Seguridad
        </h2>
      </div>

      <div className="space-y-4">
        <SubCard>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                <Key className="w-4.5 h-4.5 text-secondary" />
              </div>
              <div>
                <p className="text-body-sm font-medium text-on-surface">Contraseña</p>
                <p className="text-body-xs text-on-surface-variant mt-0.5">
                  Última modificación: {mockSecurity.passwordLastChanged}
                </p>
              </div>
            </div>
            <button className="border border-outline-variant/30 text-on-surface rounded-xl px-4 py-2 text-body-xs font-medium hover:bg-surface-container transition-colors">
              Cambiar Contraseña
            </button>
          </div>
        </SubCard>

        <SubCard>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                <Smartphone className="w-4.5 h-4.5 text-secondary" />
              </div>
              <div>
                <p className="text-body-sm font-medium text-on-surface">
                  Verificación en Dos Pasos (2FA)
                </p>
                <p className="text-body-xs text-on-surface-variant mt-0.5">
                  Añade una capa extra de seguridad a tu cuenta
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTwoFactor(!twoFactor)}
                disabled
                className={`w-10 h-6 rounded-full relative transition-colors opacity-50 cursor-not-allowed ${
                  twoFactor ? "bg-secondary" : "bg-outline-variant/30"
                }`}
              >
                <span
                  className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                    twoFactor ? "translate-x-5" : "translate-x-1"
                  }`}
                />
              </button>
              <span className="text-body-xs px-2 py-0.5 rounded-full bg-warning/10 text-warning font-medium">
                Próximamente
              </span>
            </div>
          </div>
        </SubCard>

        <SubCard>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                <LogOut className="w-4.5 h-4.5 text-secondary" />
              </div>
              <div>
                <p className="text-body-sm font-medium text-on-surface">
                  Sesiones Activas
                </p>
                <p className="text-body-xs text-on-surface-variant mt-0.5">
                  {mockSecurity.activeSessions} sesiones activas
                </p>
              </div>
            </div>
            <button className="border border-outline-variant/30 text-on-surface rounded-xl px-4 py-2 text-body-xs font-medium hover:bg-surface-container transition-colors">
              Cerrar Sesiones
            </button>
          </div>
        </SubCard>
      </div>
    </motion.div>
  );
};

const SubCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-surface-container rounded-xl border border-outline-variant/10 p-4">
    {children}
  </div>
);
