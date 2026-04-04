import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { DatabaseBackupIcon, Home, Info } from "lucide-react";
import { TablaUsuarios } from "../index";
import { maskEmail } from "../index";
export const DataBaseTemplate = () => {
    return (
        <>
            <Navbar />
            <TablaUsuarios />
        </>
    );
};

const menuItems = [
    { icon: Home, label: "Inicio", href: "/dashboard" },
    { icon: Info, label: "Acerca de", href: "/about" },
];
const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <>
            <nav className="fixed top-0 left-0 z-50 bg-white/80 backdrop-blur-md w-full border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center space-x-3">
                            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-2">
                                <DatabaseBackupIcon />
                            </div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                DataBase
                            </h1>
                        </div>

                        {menuItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="hidden md:flex items-center space-x-2 px-4 hover:text-blue-600 transition-all shadow-md hover:shadow-lg"
                            >
                                <item.icon className="w-4 h-4" />
                                <span>{item.label}</span>
                            </a>
                        ))}

                        {/* Desktop menu */}
                        <div className="hidden md:flex items-center space-x-4">
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-900">
                                    {user?.displayName || "Usuario"}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {maskEmail(user?.email)}
                                </p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                                <span>Cerrar sesión</span>
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 rounded-lg hover:bg-gray-100"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    {isMenuOpen ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    {isMenuOpen && (
                        <div className="md:hidden pb-4 space-y-3 animate-in slide-in-from-top">
                            <div className="px-4 py-2 bg-gray-50 rounded-lg">
                                <p className="text-sm font-medium text-gray-900">
                                    {user?.displayName || "Usuario"}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {maskEmail(user?.email)}
                                </p>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                                <span>Cerrar sesión</span>
                            </button>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
};
