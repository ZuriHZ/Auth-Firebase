import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, User, LayoutDashboard, Rocket, Info } from "lucide-react";
import { maskEmail } from "@/lib/mask-email";

export const NavbarDesktop = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const menuItems = [
        { name: "Inicio", path: "/", icon: <Info size={16} /> },
        { name: "About", path: "/about", icon: <Info size={16} /> },
        {
            name: "Quienes Somos",
            path: "/quienes-somos",
            icon: <Info size={16} />,
        },
        { name: "Contacto", path: "/contacto", icon: <Info size={16} /> },
        { name: "Pricing", path: "/pricing", icon: <Info size={16} /> },
    ];

    if (user) {
        menuItems.push({
            name: "Database",
            path: "/database",
            icon: <LayoutDashboard size={16} />,
        });
    }

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }
    };

    return (
        <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-full max-w-6xl flex items-center justify-between h-16 bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl px-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] ring-1 ring-black/5"
            >
                {/* Logo Section */}
                <Link to="/" className="flex items-center space-x-2 group">
                    <motion.div
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.5 }}
                        className="bg-linear-to-tr from-blue-500 to-indigo-400 rounded-lg p-1.5 shadow-lg group-hover:shadow-blue-500/50"
                    >
                        <LayoutDashboard className="w-5 h-5 text-white" />
                    </motion.div>
                    <span className="text-xl font-black tracking-tight text-white">
                        Auth
                        <span className="text-blue-400 font-extrabold">
                            Pro
                        </span>
                    </span>
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center space-x-1">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className="relative px-4 py-2 text-sm font-semibold text-white/80 hover:text-white transition-colors group"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {item.name}
                            </span>
                            <motion.span
                                className="absolute inset-0 bg-white/10 rounded-lg z-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                layoutId="nav-bg"
                            />
                        </Link>
                    ))}
                </div>

                {/* Actions / Auth Section */}
                <div className="flex items-center space-x-3">
                    <AnimatePresence mode="wait">
                        {user ? (
                            <motion.div
                                key="logged-in"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="flex items-center space-x-3"
                            >
                                <div className="flex-col items-end hidden lg:flex">
                                    <span className="text-xs font-bold text-white truncate max-w-[120px]">
                                        {user.displayName || maskEmail(user.email)}
                                    </span>
                                    <span className="text-[10px] text-blue-300/80 font-medium capitalize">
                                        Empresa
                                    </span>
                                </div>
                                <a
                                    href="/profile"
                                    className="w-9 h-9 rounded-full bg-linear-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center border border-white/20 shadow-sm"
                                >
                                    <User className="w-5 h-5 text-blue-300" />
                                </a>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all active:scale-95 border border-red-500/20"
                                    title="Cerrar sesión"
                                >
                                    <LogOut size={18} />
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="logged-out"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="flex items-center space-x-2"
                            >
                                <Link
                                    to="/login"
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/30 transition-all active:scale-95 flex items-center gap-2"
                                >
                                    <Rocket size={18} />
                                    <span>Empezar</span>
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </nav>
    );
};
