import React, { useState, useEffect, useCallback } from "react";
import { Eye, EyeOff, Copy, Check } from "lucide-react";
import { maskEmail } from "@/lib/mask-email";
import { motion, AnimatePresence } from "framer-motion";

interface EmailFieldProps {
    email: string | null;
    autoHideSeconds?: number;
}

export const EmailField: React.FC<EmailFieldProps> = ({ email, autoHideSeconds = 5 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const toggleVisibility = useCallback(() => {
        setIsVisible((prev) => !prev);
    }, []);

    const copyToClipboard = async () => {
        if (!email) return;
        try {
            await navigator.clipboard.writeText(email);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy!", err);
        }
    };

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (isVisible && autoHideSeconds > 0) {
            timer = setTimeout(() => {
                setIsVisible(false);
            }, autoHideSeconds * 1000);
        }
        return () => clearTimeout(timer);
    }, [isVisible, autoHideSeconds]);

    if (!email) return null;

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100 group transition-all hover:bg-white hover:shadow-sm">
                <span className="text-sm font-medium text-gray-600 transition-all font-mono">
                    {isVisible ? email : maskEmail(email)}
                </span>
                
                <div className="flex items-center space-x-1 border-l border-gray-200 pl-2 ml-1">
                    <button
                        onClick={toggleVisibility}
                        className="p-1 hover:text-blue-600 text-gray-400 transition-colors focus:outline-none cursor-pointer"
                        title={isVisible ? "Ocultar email" : "Ver email"}
                        aria-label="Toggle email visibility"
                    >
                        {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    
                    <button
                        onClick={copyToClipboard}
                        className="p-1 hover:text-green-600 text-gray-400 transition-colors focus:outline-none relative cursor-pointer"
                        title="Copiar email"
                        aria-label="Copy email"
                    >
                        <AnimatePresence mode="wait">
                            {isCopied ? (
                                <motion.div
                                    key="check"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                >
                                    <Check size={16} className="text-green-600" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="copy"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                >
                                    <Copy size={16} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </div>
            
            {isVisible && (
                <motion.span 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10px] text-gray-400 italic"
                >
                    Se ocultará automáticamente en {autoHideSeconds}s
                </motion.span>
            )}
        </div>
    );
};
