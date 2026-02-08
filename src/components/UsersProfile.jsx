import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ShinyButtonDemo } from "../components/ShinyButton";
    
export const UsersProfile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState(
        new Date().toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        })
    );

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    const today = new Date();
    const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const formattedDate = today.toLocaleDateString("es-ES", dateOptions);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(
                new Date().toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                })
            );
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Función para obtener las iniciales del usuario
    const getInitials = () => {
        if (user?.displayName) {
            return user.displayName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2);
        }
        return user?.email?.[0]?.toUpperCase() || "U";
    };

    // Función para obtener saludo según la hora
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Buenos días";
        if (hour < 19) return "Buenas tardes";
        return "Buenas noches";
    };

    // Calcular tiempo desde que se creó la cuenta
    const getAccountAge = () => {
        if (!user?.metadata?.creationTime) return "Reciente";
        const created = new Date(user.metadata.creationTime);
        const now = new Date();
        const diffTime = Math.abs(now - created);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 30) return `${diffDays} días`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} meses`;
        return `${Math.floor(diffDays / 365)} años`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 z-50 bg-white/80 backdrop-blur-md w-full border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center space-x-3">
                            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-2">
                                <svg
                                    className="w-6 h-6 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Mi Perfil
                            </h1>
                            <a className="cursor-pointer text-blue-600 hover:text-blue-800" href="/" target="_blank" rel="noopener noreferrer">
                                <ShinyButtonDemo />
                            </a>
                        </div>

                        {/* Desktop menu */}
                        <div className="hidden md:flex items-center space-x-4">
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-900">
                                    {user?.displayName || "Usuario"}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {user?.email}
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
                                    {user?.email}
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

            {/* Main Content */}
            <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Header con saludo y fecha/hora */}
                <div className="mb-8">
                    <h2 className="text-4xl font-bold text-gray-900 mb-2">
                        {getGreeting()},{" "}
                        {user?.displayName?.split(" ")[0] || "Usuario"}! 👋
                    </h2>
                    <div className="flex flex-wrap items-center gap-4 text-gray-600">
                        <div className="flex items-center space-x-2">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            <span className="capitalize">{formattedDate}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span className="font-mono">{currentTime}</span>
                        </div>
                    </div>
                </div>

                {/* Grid de información */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Card principal de perfil */}
                    <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                        <div className="flex flex-col items-center">
                            {/* Avatar */}
                            <div className="relative mb-4">
                                {user?.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt="Avatar"
                                        className="w-32 h-32 rounded-full border-4 border-blue-100 shadow-lg"
                                    />
                                ) : (
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-4 border-blue-100 shadow-lg">
                                        <span className="text-4xl font-bold text-white">
                                            {getInitials()}
                                        </span>
                                    </div>
                                )}
                                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
                            </div>

                            {/* Nombre y email */}
                            <h3 className="text-2xl font-bold text-gray-900 mb-1 text-center">
                                {user?.displayName || "Usuario"}
                            </h3>
                            <p className="text-gray-500 mb-4 text-center break-all">
                                {user?.email}
                            </p>

                            {/* Badges */}
                            <div className="flex flex-wrap gap-2 justify-center mb-4">
                                {user?.emailVerified && (
                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center space-x-1">
                                        <svg
                                            className="w-4 h-4"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span>Verificado</span>
                                    </span>
                                )}
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                    Miembro activo
                                </span>
                            </div>

                            {/* Botón editar perfil */}
                            <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2">
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
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    />
                                </svg>
                                <span>Editar perfil</span>
                            </button>
                        </div>
                    </div>

                    {/* Cards de información */}
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Información de cuenta */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="bg-blue-100 rounded-lg p-3">
                                    <svg
                                        className="w-6 h-6 text-blue-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900">
                                    Información de cuenta
                                </h4>
                            </div>
                            <div className="space-y-3">
                               
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-600 text-sm">
                                        Miembro desde
                                    </span>
                                    <span className="text-gray-900 font-medium text-sm">
                                        {getAccountAge()}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-600 text-sm">
                                        Último acceso
                                    </span>
                                    <span className="text-gray-900 font-medium text-sm">
                                        Hoy
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-600 text-sm">
                                        Proveedor
                                    </span>
                                    <span className="text-gray-900 font-medium text-sm">
                                        {user?.providerData?.[0]?.providerId ===
                                        "google.com"
                                            ? "Google"
                                            : "Email"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Estadísticas */}
                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="bg-white/20 rounded-lg p-3">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                        />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-semibold">
                                    Estadísticas
                                </h4>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                    <p className="text-3xl font-bold">0</p>
                                    <p className="text-white/80 text-sm mt-1">
                                        Proyectos
                                    </p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                    <p className="text-3xl font-bold">0</p>
                                    <p className="text-white/80 text-sm mt-1">
                                        Tareas
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Seguridad */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="bg-green-100 rounded-lg p-3">
                                    <svg
                                        className="w-6 h-6 text-green-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900">
                                    Seguridad
                                </h4>
                            </div>
                            <div className="space-y-3">
                                <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                                    <span className="text-gray-700 text-sm">
                                        Cambiar contraseña
                                    </span>
                                    <svg
                                        className="w-4 h-4 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                                <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                                    <span className="text-gray-700 text-sm">
                                        Verificación en dos pasos
                                    </span>
                                    <svg
                                        className="w-4 h-4 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                                <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                                    <span className="text-gray-700 text-sm">
                                        Dispositivos activos
                                    </span>
                                    <svg
                                        className="w-4 h-4 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Actividad reciente */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="bg-purple-100 rounded-lg p-3">
                                    <svg
                                        className="w-6 h-6 text-purple-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900">
                                    Actividad reciente
                                </h4>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-900 font-medium">
                                            Inicio de sesión exitoso
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Hace unos momentos
                                        </p>
                                    </div>
                                </div>
                                <div className="text-center py-4 text-gray-400 text-sm">
                                    No hay más actividad reciente
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
