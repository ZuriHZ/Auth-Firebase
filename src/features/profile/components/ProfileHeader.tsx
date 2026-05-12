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
            className="mb-12"
        >
            <h2 className="text-[48px] leading-[1.1] font-display-lg text-on-surface mb-4" style={{ letterSpacing: "-0.02em" }}>
                {greeting},{" "}
                <span className="text-secondary">{firstName}</span>
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-on-surface-variant">
                <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-lg border border-outline-variant/20">
                    <Calendar className="w-4 h-4 text-secondary" />
                    <span className="text-body-sm capitalize">{formattedDate}</span>
                </div>

                <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-lg border border-outline-variant/20">
                    <Clock className="w-4 h-4 text-secondary" />
                    <span className="font-mono text-body-sm text-on-surface tabular-nums tracking-wider">
                        {currentTime}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};
