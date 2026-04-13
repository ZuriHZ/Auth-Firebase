import React, { useMemo } from "react";
import { BadgeCheck, Edit3, ShieldAlert } from "lucide-react";
import { ProfileUser } from "../types";
import { EmailField } from "./EmailField";
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
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-500/5 p-8 border border-white/50 sticky top-24"
        >
            <div className="flex flex-col items-center">
                {/* Avatar Section */}
                <div className="relative group mb-6">
                    <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    {user?.photoURL ? (
                        <img
                            src={user.photoURL}
                            alt="Profile"
                            className="relative w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
                        />
                    ) : (
                        <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center border-4 border-white shadow-xl">
                            <span className="text-4xl font-bold text-white tracking-tight">
                                {initials}
                            </span>
                        </div>
                    )}
                    <div className="absolute bottom-2 right-2 w-7 h-7 bg-green-500 border-4 border-white rounded-full shadow-lg"></div>
                </div>

                {/* Name & Identity */}
                <div className="text-center mb-6">
                    <h3 className="text-2xl font-black text-gray-900 leading-tight mb-2">
                        {user?.displayName || "Member"}
                    </h3>
                    <EmailField email={user?.email || ""} />
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 justify-center mb-8">
                    {user?.emailVerified ? (
                        <div className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-bold flex items-center space-x-1 border border-green-100 italic">
                            <BadgeCheck size={14} />
                            <span>Verificado</span>
                        </div>
                    ) : (
                        <div className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-xs font-bold flex items-center space-x-1 border border-amber-100 italic">
                            <ShieldAlert size={14} />
                            <span>No Verificado</span>
                        </div>
                    )}
                    <div className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-blue-100 italic">
                        Elite Member
                    </div>
                </div>

                {/* Main Action */}
                <button className="w-full group relative px-6 py-3.5 bg-gray-900 text-white rounded-2xl font-bold transition-all hover:bg-black hover:shadow-xl hover:shadow-gray-200 active:scale-95 flex items-center justify-center space-x-3 overflow-hidden">
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Edit3 size={18} className="relative group-hover:rotate-12 transition-transform" />
                    <span className="relative">Personalizar Perfil</span>
                </button>
            </div>
        </motion.div>
    );
};
