import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, User as UserIcon } from "lucide-react";
import { MenuItem, ProfileUser } from "../types";
import { motion, AnimatePresence } from "framer-motion";

interface ProfileNavbarProps {
    user: ProfileUser | null;
    logout: () => Promise<void>;
    menuItems: MenuItem[];
}

export const ProfileNavbar: React.FC<ProfileNavbarProps> = ({ user, logout, menuItems }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <nav className="fixed top-0 left-0 z-50 w-full bg-white/70 backdrop-blur-xl border-b border-gray-100/50 transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo/Title */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="bg-linear-to-tr from-blue-600 to-indigo-600 rounded-xl p-2 shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
                            <UserIcon className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                            Account Center
                        </h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {menuItems.map((item) => (
                            <Link
                                key={item.label}
                                to={item.href}
                                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all"
                            >
                                <item.icon className="w-4 h-4" />
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* User Profile & Actions */}
                    <div className="hidden md:flex items-center space-x-4 pl-4 border-l border-gray-100">
                        <div className="flex flex-col items-end">
                            <span className="text-sm font-semibold text-gray-900 leading-none">
                                {user?.displayName || "Usuario"}
                            </span>
                            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-1">
                                {user?.emailVerified ? "Verified Account" : "Standard Account"}
                            </span>
                        </div>
                        
                        <button
                            onClick={handleLogout}
                            className="group flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-red-600 transition-all shadow-lg shadow-gray-200 hover:shadow-red-200"
                        >
                            <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm font-medium">Salir</span>
                        </button>
                    </div>

                    {/* Mobile menu toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.label}
                                    to={item.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all"
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-gray-50 mt-2">
                                <div className="px-4 py-3 mb-4 bg-gray-50 rounded-2xl flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                        {user?.displayName?.[0] || "U"}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900 leading-none">{user?.displayName}</p>
                                        <p className="text-xs text-gray-500 mt-1">{user?.email}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center justify-center space-x-2 p-4 bg-red-50 text-red-600 font-bold rounded-2xl hover:bg-red-100 transition-colors"
                                >
                                    <LogOut className="w-5 h-5" />
                                    <span>Cerrar sesión</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
