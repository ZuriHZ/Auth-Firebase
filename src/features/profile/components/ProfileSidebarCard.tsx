import React, { useMemo } from "react";
import { BadgeCheck, Edit3, ShieldAlert } from "lucide-react";
import { ProfileUser } from "../types";
import { motion } from "framer-motion";

interface ProfileSidebarCardProps {
    user: ProfileUser | null;
}

export const ProfileSidebarCard: React.FC<ProfileSidebarCardProps> = ({ user }) => {
    const initials = useMemo(() => {
        if (user?.displayName) {
            return user.displayName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2);
        }
        return user?.email?.[0].toUpperCase() || "U";
    }, [user?.displayName, user?.email]);

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/30 shadow-[0px_1px_3px_rgba(11,28,48,0.05)] sticky top-24"
        >
            <div className="flex flex-col items-center">
                {/* Avatar Section */}
                <div className="relative group mb-8">
                    {user?.photoURL ? (
                        <img
                            src={user.photoURL}
                            alt="Profile"
                            className="relative w-32 h-32 rounded-full border-4 border-surface-container-high shadow-xl object-cover"
                        />
                    ) : (
                        <div className="relative w-32 h-32 rounded-full bg-secondary flex items-center justify-center border-4 border-surface-container-high shadow-xl">
                            <span className="text-4xl font-bold text-on-secondary tracking-tight">
                                {initials}
                            </span>
                        </div>
                    )}
                    <div className="absolute bottom-2 right-2 w-7 h-7 bg-green-500 border-4 border-surface-container-lowest rounded-full shadow-lg"></div>
                </div>

                {/* Name & Identity */}
<div className="text-center mb-6">
                    <h3 className="text-[24px] leading-[1.3] font-headline-md text-on-surface mb-2" style={{ letterSpacing: "-0.01em" }}>
                        {user?.displayName || "Usuario"}
                    </h3>
                    <p className="text-body-sm text-on-surface-variant">{user?.email}</p>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 justify-center mb-8">
                    {user?.emailVerified ? (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary-container/10 text-secondary rounded-full text-body-sm font-medium border border-secondary/20">
                            <BadgeCheck size={14} />
                            <span>Email verificado</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-full text-body-sm font-medium border border-yellow-200/50">
                            <ShieldAlert size={14} />
                            <span>Email pendiente</span>
                        </div>
                    )}
                </div>

                {/* Main Action */}
                <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-on-secondary rounded-xl font-medium text-body-sm hover:opacity-90 active:scale-95 transition-all shadow-md">
                    <Edit3 size={16} />
                    <span>Editar perfil</span>
                </button>
            </div>
        </motion.div>
    );
};
