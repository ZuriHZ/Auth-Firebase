import React, { useMemo } from "react";
import { Calendar, Clock } from "lucide-react";
import { useClock } from "../hooks/useClock";
import { ProfileUser } from "../types";
import { motion } from "framer-motion";

interface ProfileHeaderProps {
    user: ProfileUser | null;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
    const currentTime = useClock();

    const greeting = useMemo(() => {
        const hour = new Date().getHours();
        if (hour < 5) return "Buenas noches";
        if (hour < 12) return "Buenos días";
        if (hour < 19) return "Buenas tardes";
        return "Buenas noches";
    }, []);

    const formattedDate = useMemo(() => {
        return new Date().toLocaleDateString("es-ES", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }, []);

    const firstName = user?.displayName?.split(" ")[0] || "Usuario";

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
        >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                {greeting},{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {firstName}
                </span>! 👋
            </h2>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-500 font-medium">
                <div className="flex items-center space-x-2.5 bg-white/50 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/50 shadow-sm">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span className="capitalize text-sm">{formattedDate}</span>
                </div>
                
                <div className="flex items-center space-x-2.5 bg-white/50 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/50 shadow-sm">
                    <Clock className="w-4 h-4 text-indigo-500" />
                    <span className="font-mono text-sm tabular-nums tracking-wider text-gray-700">
                        {currentTime}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};
