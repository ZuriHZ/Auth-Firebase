import React from "react";
import {
    Fingerprint,
    BarChart3,
    ShieldCheck,
    History,
    ChevronRight,
    Lock,
    Smartphone
} from "lucide-react";
import { ProfileUser } from "../types";
import { DataCard } from "./DataCard";
import { getAccountAge } from "@/lib/date";

interface ProfileInfoGridProps {
    user: ProfileUser | null;
}

export const ProfileInfoGrid: React.FC<ProfileInfoGridProps> = ({ user }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Account Info */}
            <DataCard
                title="Detalles de Cuenta"
                icon={<Fingerprint size={20} />}
                delay={0.2}
            >
                <div className="space-y-1">
                    <InfoRow label="Miembro desde" value={getAccountAge(user?.metadata?.creationTime)} />
                    <InfoRow label="Estado" value={user?.emailVerified ? "Verificado" : "Pendiente"} />
                    <InfoRow
                        label="Proveedor"
                        value={user?.providerData?.[0]?.providerId === "google.com" ? "Google" : "Email/Password"}
                        isLast
                    />
                </div>
            </DataCard>

            {/* Security */}
            <DataCard
                title="Seguridad"
                icon={<ShieldCheck size={20} />}
                delay={0.3}
            >
                <div className="space-y-3">
                    <SecurityButton icon={<Lock size={16} />} label="Cambiar contraseña" />
                    <SecurityButton icon={<Smartphone size={16} />} label="Auth 2-Pasos" />
                </div>
            </DataCard>

            {/* Activity */}
            <DataCard
                title="Actividad de Sesión"
                icon={<History size={20} />}
                delay={0.4}
            >
                <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-surface-container-low rounded-xl border border-outline-variant/20">
                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full mt-1.5 shadow-lg" />
                        <div>
                            <p className="text-body-sm font-semibold text-on-surface">Sesión activa</p>
                            <p className="text-label-md text-on-surface-variant mt-0.5">Dispositivo actual</p>
                        </div>
                    </div>
                </div>
            </DataCard>

            {/* Quick Actions */}
            <DataCard
                title="Acciones Rápidas"
                icon={<BarChart3 size={20} />}
                delay={0.5}
            >
                <div className="space-y-3">
                    <button className="w-full group flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-outline-variant/20 hover:bg-surface-container-lowest transition-all">
                        <div className="flex items-center gap-3">
                            <span className="text-secondary"><Lock size={16} /></span>
                            <span className="text-body-sm font-medium text-on-surface">Cambiar contraseña</span>
                        </div>
                        <ChevronRight size={16} className="text-on-surface-variant group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="w-full group flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-outline-variant/20 hover:bg-surface-container-lowest transition-all">
                        <div className="flex items-center gap-3">
                            <span className="text-secondary"><Smartphone size={16} /></span>
                            <span className="text-body-sm font-medium text-on-surface">Autenticación 2-Pasos</span>
                        </div>
                        <ChevronRight size={16} className="text-on-surface-variant group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </DataCard>
        </div>
    );
};

// Internal Sub-components
const InfoRow = ({ label, value, isLast = false }: { label: string; value: string; isLast?: boolean }) => (
    <div className={`flex justify-between items-center py-4 ${!isLast ? "border-b border-outline-variant/20" : ""}`}>
        <span className="text-body-sm text-on-surface-variant">{label}</span>
        <span className="text-body-sm font-semibold text-on-surface bg-surface-container px-3 py-1 rounded-lg border border-outline-variant/10">{value}</span>
    </div>
);

const SecurityButton = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
    <button className="w-full group flex items-center justify-between p-4 bg-surface-container-low hover:bg-surface-container-lowest rounded-xl border border-outline-variant/20 transition-all">
        <div className="flex items-center gap-3">
            <span className="text-secondary">{icon}</span>
            <span className="text-body-sm font-medium text-on-surface">{label}</span>
        </div>
        <ChevronRight size={16} className="text-on-surface-variant group-hover:translate-x-1 transition-transform" />
    </button>
);
