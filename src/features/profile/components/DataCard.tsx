import React from "react";
import { motion } from "framer-motion";

interface DataCardProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    variant?: "white" | "gradient";
    delay?: number;
}

export const DataCard: React.FC<DataCardProps> = ({ 
    title, 
    icon, 
    children, 
    className = "", 
    variant = "white",
    delay = 0 
}) => {
    const variants = {
        white: "bg-white/80 border-gray-100",
        gradient: "bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-transparent"
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay }}
            className={`rounded-3xl shadow-xl shadow-gray-100/50 p-6 border backdrop-blur-sm ${variants[variant]} ${className}`}
        >
            <div className="flex items-center space-x-4 mb-6">
                <div className={`${variant === 'white' ? 'bg-gray-50 text-blue-600' : 'bg-white/20 text-white'} p-3 rounded-2xl shadow-inner`}>
                    {icon}
                </div>
                <h4 className={`text-lg font-black tracking-tight ${variant === 'white' ? 'text-gray-900' : 'text-white'}`}>
                    {title}
                </h4>
            </div>
            {children}
        </motion.div>
    );
};
