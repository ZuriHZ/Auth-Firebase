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
            <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-container-low rounded-lg border border-outline-variant/30 group transition-all">
                <span className="text-body-sm font-medium text-on-surface-variant transition-all font-mono">
                    {isVisible ? email : maskEmail(email)}
                </span>

                <div className="flex items-center gap-1 border-l border-outline-variant/30 pl-2">
                    <button
                        onClick={toggleVisibility}
                        className="p-1 hover:text-secondary text-on-surface-variant transition-colors focus:outline-none cursor-pointer"
                        title={isVisible ? "Ocultar email" : "Ver email"}
                        aria-label="Toggle email visibility"
                    >
                        {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>

                    <button
                        onClick={copyToClipboard}
                        className="p-1 hover:text-secondary text-on-surface-variant transition-colors focus:outline-none relative cursor-pointer"
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
                    className="text-label-md text-on-surface-variant italic"
                >
                    Se ocultará automáticamente en {autoHideSeconds}s
                </motion.span>
            )}
        </div>
    );
};
