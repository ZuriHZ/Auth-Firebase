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
                icon={<Fingerprint size={24} />}
                delay={0.2}
            >
                <div className="space-y-1">
                    <InfoRow label="Miembro desde" value={getAccountAge(user?.metadata?.creationTime)} />
                    <InfoRow label="Estado" value="Premium Access" />
                    <InfoRow 
                        label="Proveedor" 
                        value={user?.providerData?.[0]?.providerId === "google.com" ? "Google Account" : "Email & Password"} 
                        isLast 
                    />
                </div>
            </DataCard>

            {/* Stats */}
            <DataCard 
                title="Métricas" 
                icon={<BarChart3 size={24} />} 
                variant="gradient"
                delay={0.3}
            >
                <div className="grid grid-cols-2 gap-4">
                    <StatBox count="12" label="Proyectos" />
                    <StatBox count="48" label="Tasks" />
                </div>
            </DataCard>

            {/* Security */}
            <DataCard 
                title="Seguridad" 
                icon={<ShieldCheck size={24} />}
                delay={0.4}
            >
                <div className="space-y-3">
                    <SecurityButton icon={<Lock size={16} />} label="Cambiar contraseña" />
                    <SecurityButton icon={<Smartphone size={16} />} label="Auth 2-Pasos" />
                </div>
            </DataCard>

            {/* Activity */}
            <DataCard 
                title="Actividad Local" 
                icon={<History size={24} />}
                delay={0.5}
            >
                <div className="space-y-4">
                    <div className="flex items-start space-x-4 p-4 bg-green-50/50 rounded-2xl border border-green-100/50">
                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full mt-1.5 shadow-lg shadow-green-200 animate-pulse" />
                        <div className="flex-1">
                            <p className="text-sm text-gray-900 font-bold">Sesión Activa ahora</p>
                            <p className="text-xs text-gray-500 mt-0.5">Dispositivo actual • Monterrey, MX</p>
                        </div>
                    </div>
                </div>
            </DataCard>
        </div>
    );
};

// Internal Sub-components
const InfoRow = ({ label, value, isLast = false }: { label: string; value: string; isLast?: boolean }) => (
    <div className={`flex justify-between items-center py-4 ${!isLast ? 'border-b border-gray-50' : ''}`}>
        <span className="text-gray-500 text-sm font-medium">{label}</span>
        <span className="text-gray-900 font-bold text-sm bg-gray-50 px-3 py-1 rounded-lg">{value}</span>
    </div>
);

const StatBox = ({ count, label }: { count: string; label: string }) => (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 transition-transform hover:scale-105">
        <p className="text-3xl font-black">{count}</p>
        <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest mt-1">{label}</p>
    </div>
);

const SecurityButton = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
    <button className="w-full group flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all border border-transparent hover:border-gray-200">
        <div className="flex items-center space-x-3">
            <span className="text-gray-500 group-hover:text-blue-600 transition-colors">{icon}</span>
            <span className="text-gray-700 text-sm font-bold">{label}</span>
        </div>
        <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
    </button>
);
