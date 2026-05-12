import React from "react";
import { motion } from "framer-motion";

interface DataCardProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export const DataCard: React.FC<DataCardProps> = ({
    title,
    icon,
    children,
    className = "",
    delay = 0
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay }}
            className={`bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-[0px_1px_3px_rgba(11,28,48,0.05)] ${className}`}
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-secondary/10 p-3 rounded-lg text-secondary">
                    {icon}
                </div>
                <h4 className="text-[24px] leading-[1.3] font-headline-md text-on-surface" style={{ letterSpacing: "-0.01em" }}>
                    {title}
                </h4>
            </div>
            {children}
        </motion.div>
    );
};
