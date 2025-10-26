import React, { useState } from "react";
import { Menu, X, Home, User, Settings, Mail, Info } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    const menuItems = [
        { icon: Home, label: "Inicio", href: "/dashboard" },
        { icon: User, label: "Perfil", href: "/profile" }, // Assuming a profile page
        { icon: Mail, label: "Mensajes", href: "/messages" }, // Assuming a messages page
        { icon: Settings, label: "Configuración", href: "/settings" }, // Assuming a settings page
        { icon: Info, label: "Acerca de", href: "/about" }, // Assuming an about page
    ];

    return (
        <>
            {/* Botón Hamburguesa */}
            <button
                onClick={toggleMenu}
                className="fixed top-6 right-6 z-50 p-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
                aria-label="Toggle menu"
            >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Overlay del menú */}
            <div
                className={`fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 z-40 transition-all duration-500 ease-in-out ${
                    isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
            >
                {/* Contenido del menú */}
                <div className="h-full w-full flex flex-col items-center justify-center p-8">
                    {/* Logo o título */}
                    <div
                        className={`mb-12 transition-all duration-700 delay-100 ${
                            isOpen
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 -translate-y-10"
                        }`}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-2">
                            Menú
                        </h1>
                        <p className="text-gray-300 text-center text-lg">
                            Explora las opciones
                        </p>
                    </div>

                    {/* Items del menú */}
                    <nav className="w-full max-w-md">
                        <ul className="space-y-4">
                            {menuItems.map((item, index) => (
                                <li
                                    key={index}
                                    className={`transition-all duration-500 ${
                                        isOpen && index < menuItems.length
                                            ? "opacity-100 translate-x-0" // Only animate if menu is open and item is within bounds
                                            : "opacity-0 -translate-x-10"
                                    }`}
                                    style={{
                                        transitionDelay: `${
                                            150 + index * 100
                                        }ms`,
                                    }}
                                >
                                    <a
                                        href={item.href}
                                        onClick={(e) => {
                                            // e.preventDefault(); // Remove preventDefault to allow navigation
                                            setIsOpen(false);
                                        }}
                                        className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 group"
                                    >
                                        <div className="p-3 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                                            <item.icon
                                                size={24}
                                                className="text-white"
                                            />
                                        </div>
                                        <span className="text-2xl font-medium text-white group-hover:translate-x-2 transition-transform">
                                            {item.label}
                                        </span>
                                    </a>
                                </li>
                            ))}
                            {user && (
                                <li
                                    className={`transition-all duration-500 ${
                                        isOpen
                                            ? "opacity-100 translate-x-0"
                                            : "opacity-0 -translate-x-10"
                                    }`}
                                    style={{
                                        transitionDelay: `${
                                            150 + menuItems.length * 100
                                        }ms`,
                                    }}
                                >
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-4 p-4 bg-red-600/80 backdrop-blur-sm rounded-xl hover:bg-red-700/80 transition-all duration-300 group"
                                    >
                                        <div className="p-3 bg-red-700/50 rounded-lg group-hover:bg-red-800/50 transition-colors">
                                            <X
                                                size={24}
                                                className="text-white"
                                            />
                                        </div>
                                        <span className="text-2xl font-medium text-white group-hover:translate-x-2 transition-transform">
                                            Cerrar sesión
                                        </span>
                                    </button>
                                </li>
                            )}
                        </ul>
                    </nav>

                    {/* Footer opcional */}
                    <div
                        className={`mt-12 text-center transition-all duration-700 delay-500 ${
                            isOpen
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-10"
                        }`}
                    >
                        <p className="text-gray-400 text-sm">
                            © 2025 Tu Aplicación
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};
