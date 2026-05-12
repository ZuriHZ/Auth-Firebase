// src/components/Dashboard.jsx - Landing Page AuthPro
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";

export const Dashboard = () => {
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

// If user is logged in, show AuthPro user dashboard
    if (user) {
        return (
            <div className="min-h-screen bg-background text-on-background">
                <Navbar />

                <main className="max-w-[1280px] mx-auto px-[40px] py-12">
                    {/* Header */}
                    <div className="mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/10 border border-secondary/20 text-secondary mb-4">
                            <span className="material-symbols-outlined text-sm">verified_user</span>
                            <span className="text-label-md uppercase tracking-wider">
                                {user.emailVerified ? "Email verificado" : "Email pendiente"}
                            </span>
                        </div>
                        <h1 className="text-[48px] leading-[1.1] font-display-lg text-on-surface mb-3" style={{ letterSpacing: "-0.02em" }}>
                            Bienvenido,{" "}
                            <span className="text-secondary">
                                {user.displayName?.split(" ")[0] || user.email?.split("@")[0] || "Usuario"}
                            </span>
                        </h1>
                        <p className="text-body-lg text-on-surface-variant max-w-2xl">
                            Tu cuenta está protegida con Firebase Authentication. Gestiona tu perfil y accede a todas las funcionalidades.
                        </p>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <Link
                            to="/profile"
                            className="group bg-surface p-8 rounded-xl border border-outline-variant/50 hover:border-secondary/30 transition-all shadow-sm"
                        >
                            <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-6 text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                                <span className="material-symbols-outlined text-2xl">account_circle</span>
                            </div>
                            <h3 className="text-[24px] leading-[1.3] font-headline-md text-on-surface mb-3" style={{ letterSpacing: "-0.01em" }}>
                                Perfil
                            </h3>
                            <p className="text-body-md text-on-surface-variant">
                                Edita tu información personal, foto de perfil y preferencias de cuenta.
                            </p>
                        </Link>

                        <Link
                            to="/database"
                            className="group bg-surface p-8 rounded-xl border border-outline-variant/50 hover:border-secondary/30 transition-all shadow-sm"
                        >
                            <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-6 text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                                <span className="material-symbols-outlined text-2xl">database</span>
                            </div>
                            <h3 className="text-[24px] leading-[1.3] font-headline-md text-on-surface mb-3" style={{ letterSpacing: "-0.01em" }}>
                                Base de Datos
                            </h3>
                            <p className="text-body-md text-on-surface-variant">
                                Explora los usuarios registrados en la plataforma y consulta información.
                            </p>
                        </Link>

                        <Link
                            to="/about"
                            className="group bg-surface p-8 rounded-xl border border-outline-variant/50 hover:border-secondary/30 transition-all shadow-sm"
                        >
                            <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-6 text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                                <span className="material-symbols-outlined text-2xl">info</span>
                            </div>
                            <h3 className="text-[24px] leading-[1.3] font-headline-md text-on-surface mb-3" style={{ letterSpacing: "-0.01em" }}>
                                Acerca de
                            </h3>
                            <p className="text-body-md text-on-surface-variant">
                                Conoce más sobre AuthPro y las tecnologías que potencian esta plataforma.
                            </p>
                        </Link>
                    </div>

                    {/* User Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {/* Account Card */}
                        <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/30 shadow-[0px_1px_3px_rgba(11,28,48,0.05)]">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                                    <span className="material-symbols-outlined text-xl">mail</span>
                                </div>
                                <h3 className="text-[24px] leading-[1.3] font-headline-md text-on-surface" style={{ letterSpacing: "-0.01em" }}>
                                    Cuenta
                                </h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-label-md text-on-surface-variant uppercase tracking-wider">Email</span>
                                    <p className="text-body-lg text-on-surface font-medium">{user.email}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-label-md text-on-surface-variant uppercase tracking-wider">Nombre</span>
                                    <p className="text-body-lg text-on-surface font-medium">{user.displayName || "No configurado"}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-label-md text-on-surface-variant uppercase tracking-wider">Estado</span>
                                    <div className="flex items-center gap-2">
                                        {user.emailVerified ? (
                                            <>
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full text-body-sm font-medium">
                                                    <span className="material-symbols-outlined text-sm">check_circle</span>
                                                    Verificado
                                                </span>
                                            </>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-body-sm font-medium">
                                                    <span className="material-symbols-outlined text-sm">schedule</span>
                                                    Pendiente
                                                </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Provider Card */}
                        <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/30 shadow-[0px_1px_3px_rgba(11,28,48,0.05)]">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                                    <span className="material-symbols-outlined text-xl">key</span>
                                </div>
                                <h3 className="text-[24px] leading-[1.3] font-headline-md text-on-surface" style={{ letterSpacing: "-0.01em" }}>
                                    Proveedor
                                </h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-label-md text-on-surface-variant uppercase tracking-wider">Método</span>
                                    <p className="text-body-lg text-on-surface font-medium capitalize">
                                        {user.providerData[0]?.providerId?.split(".com")[0]?.split("firebase")[1] || "Email/Password"}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-label-md text-on-surface-variant uppercase tracking-wider">UID</span>
                                    <p className="text-body-sm text-on-surface font-mono bg-surface-container px-3 py-2 rounded-lg border border-outline-variant/20 overflow-x-auto">
                                        {user.uid}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-label-md text-on-surface-variant uppercase tracking-wider">Creado</span>
                                    <p className="text-body-md text-on-surface">
                                        {user.metadata?.creationTime
                                            ? new Date(user.metadata.creationTime).toLocaleDateString("es-ES", {
                                                  day: "numeric",
                                                  month: "long",
                                                  year: "numeric",
                                              })
                                            : "—"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Security Note */}
                    {!user.emailVerified && (
                        <div className="bg-surface-container-low border-l-4 border-secondary px-6 py-5 rounded-r-xl mb-12">
                            <div className="flex items-start gap-4">
                                <span className="material-symbols-outlined text-secondary text-2xl mt-0.5">security</span>
                                <div>
                                    <h4 className="text-body-lg font-semibold text-on-surface mb-1">
                                        Verificación de email pendiente
                                    </h4>
                                    <p className="text-body-sm text-on-surface-variant">
                                        Revisa tu bandeja de entrada y verifica tu email para desbloquear todas las funcionalidades de tu cuenta AuthPro.
                                    </p>
                                    <Link
                                        to="/verify-email"
                                        className="inline-flex items-center gap-2 mt-3 text-secondary font-semibold text-body-sm hover:text-secondary-container transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-sm">mail</span>
                                        Reenviar verificación
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </main>

                {/* Footer */}
                <footer className="border-t border-outline-variant/30 py-8">
                    <div className="max-w-[1280px] mx-auto px-[40px] flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-secondary text-xl">shield_lock</span>
                            <span className="text-headline-md font-headline-lg text-secondary">AuthPro</span>
                        </div>
                        <p className="text-body-sm text-on-surface-variant">
                            © 2024 AuthPro Inc. Secure Infrastructure Division.
                        </p>
                    </div>
                </footer>
            </div>
        );
    }

    // Public Landing Page
    return (
        <div className="min-h-screen bg-background text-on-background">
            <Navbar />

            <main>
                {/* Hero Section */}
                <section className="relative overflow-hidden bg-gradient-to-b from-surface-container-lowest to-surface py-24 md:py-32 hero-pattern">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none"></div>
                    <div className="max-w-[1280px] mx-auto px-[40px] text-center relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-secondary-container/10 border border-secondary/20 text-secondary mb-8">
                            <span className="material-symbols-outlined text-[18px]">
                                auto_awesome
                            </span>
                            <span className="text-label-md font-label-md uppercase tracking-wider">Nueva Versión 2.0</span>
                        </div>
                        <h1 className="text-[48px] leading-[1.1] font-display-lg text-on-surface max-w-4xl mx-auto mb-6" style={{ letterSpacing: "-0.02em" }}>
                            Autenticación <span className="text-secondary">Simplificada</span>
                        </h1>
                        <p className="text-[18px] leading-[1.6] text-on-surface-variant max-w-2xl mx-auto mb-10">
                            La plataforma más completa y segura para gestionar la identidad de tus usuarios en la nube. Implementa flujos de autenticación robustos en minutos.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/register"
                                className="w-full sm:w-auto bg-secondary text-on-secondary px-8 py-4 rounded-xl text-label-md font-label-md hover:shadow-lg hover:shadow-secondary/20 active:scale-95 transition-all"
                            >
                                Comenzar Gratis
                            </Link>
                            <Link
                                to="/login"
                                className="w-full sm:w-auto bg-surface-container-lowest text-on-surface border border-outline-variant px-8 py-4 rounded-xl text-label-md font-label-md hover:bg-surface-container-low active:scale-95 transition-all"
                            >
                                Saber Más
                            </Link>
                        </div>
                        <div className="mt-20 rounded-2xl overflow-hidden border border-outline-variant/30 shadow-2xl">
                            <div className="w-full h-auto bg-surface-container p-8 text-center">
                                <div className="flex items-center justify-center gap-3 mb-4">
                                    <span className="material-symbols-outlined text-secondary text-5xl">shield_lock</span>
                                    <span className="text-[32px] font-headline-lg text-on-surface">AuthPro Dashboard</span>
                                </div>
                                <p className="text-on-surface-variant text-body-md">Panel de control de autenticación moderno y seguro</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-24 bg-surface-container-lowest">
                    <div className="max-w-[1280px] mx-auto px-[40px]">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Feature 1 */}
                            <div className="bg-surface p-8 rounded-xl border border-outline-variant/50 hover:border-secondary/30 transition-all group shadow-sm">
                                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-6 text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                                    <span className="material-symbols-outlined text-2xl">lock</span>
                                </div>
                                <h3 className="text-[24px] leading-[1.3] font-headline-md text-on-surface mb-4" style={{ letterSpacing: "-0.01em" }}>
                                    Seguridad Robusta
                                </h3>
                                <p className="text-body-md text-on-surface-variant">
                                    Protección de datos de nivel empresarial con Firebase Authentication. Encriptación de extremo a extremo y cumplimiento normativo global.
                                </p>
                            </div>
                            {/* Feature 2 */}
                            <div className="bg-surface p-8 rounded-xl border border-outline-variant/50 hover:border-secondary/30 transition-all group shadow-sm">
                                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-6 text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                                    <span className="material-symbols-outlined text-2xl">integration_instructions</span>
                                </div>
                                <h3 className="text-[24px] leading-[1.3] font-headline-md text-on-surface mb-4" style={{ letterSpacing: "-0.01em" }}>
                                    Fácil Integración
                                </h3>
                                <p className="text-body-md text-on-surface-variant">
                                    API intuitiva y documentación clara para empezar en minutos. SDKs disponibles para React, Vue, Angular y aplicaciones móviles nativas.
                                </p>
                            </div>
                            {/* Feature 3 */}
                            <div className="bg-surface p-8 rounded-xl border border-outline-variant/50 hover:border-secondary/30 transition-all group shadow-sm">
                                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-6 text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                                    <span className="material-symbols-outlined text-2xl">trending_up</span>
                                </div>
                                <h3 className="text-[24px] leading-[1.3] font-headline-md text-on-surface mb-4" style={{ letterSpacing: "-0.01em" }}>
                                    Escalabilidad Total
                                </h3>
                                <p className="text-body-md text-on-surface-variant">
                                    Preparado para crecer desde pequeños proyectos hasta grandes empresas. Infraestructura redundante que crece con tu base de usuarios.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section id="stats" className="py-20 bg-foreground text-background">
                    <div className="max-w-[1280px] mx-auto px-[40px]">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                            <div>
                                <div className="text-[56px] font-display-lg text-secondary-fixed mb-2">50k+</div>
                                <div className="text-label-md font-label-md text-surface-variant uppercase tracking-widest">Usuarios Activos</div>
                            </div>
                            <div>
                                <div className="text-[56px] font-display-lg text-secondary-fixed mb-2">99.9%</div>
                                <div className="text-label-md font-label-md text-surface-variant uppercase tracking-widest">Disponibilidad</div>
                            </div>
                            <div>
                                <div className="text-[56px] font-display-lg text-secondary-fixed mb-2">25+</div>
                                <div className="text-label-md font-label-md text-surface-variant uppercase tracking-widest">Países</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA Section */}
                <section className="py-24 max-w-[1280px] mx-auto px-[40px]">
                    <div className="relative bg-gradient-to-br from-secondary to-[#004395] rounded-3xl p-12 md:p-20 text-center text-on-secondary overflow-hidden shadow-xl">
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')]"></div>
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-[48px] leading-[1.1] font-display-lg mb-6 text-white" style={{ letterSpacing: "-0.02em" }}>
                                ¿Listo para transformar tu app?
                            </h2>
                            <p className="text-[18px] leading-[1.6] mb-10 text-white/80 max-w-2xl mx-auto">
                                Únete a los miles de desarrolladores que ya están construyendo el futuro con nuestra infraestructura de seguridad líder.
                            </p>
                            <Link
                                to="/register"
                                className="inline-block bg-white text-secondary px-10 py-4 rounded-xl text-[24px] font-headline-md hover:bg-surface-container-lowest active:scale-95 transition-all shadow-lg"
                            >
                                Crear Cuenta Ahora
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-surface-container-lowest border-t border-outline-variant/50 py-12">
                <div className="max-w-[1280px] mx-auto px-[40px] grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-secondary text-2xl">
                                shield_lock
                            </span>
                            <span className="text-headline-md font-headline-lg text-secondary">AuthPro</span>
                        </div>
                        <p className="text-body-sm text-on-surface-variant max-w-sm">
                            Proporcionando soluciones de identidad seguras y escalables para la próxima generación de aplicaciones web y móviles.
                        </p>
                        <p className="text-body-sm text-on-surface-variant">
                            © 2024 AuthPro Inc. All rights reserved.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-label-md font-label-md text-on-surface mb-6 uppercase tracking-wider">Recursos</h4>
                            <ul className="space-y-4">
                                <li><a className="text-body-sm text-on-surface-variant hover:text-secondary underline transition-all" href="#">Documentación</a></li>
                                <li><a className="text-body-sm text-on-surface-variant hover:text-secondary underline transition-all" href="#">API Reference</a></li>
                                <li><a className="text-body-sm text-on-surface-variant hover:text-secondary underline transition-all" href="#">Soporte</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-label-md font-label-md text-on-surface mb-6 uppercase tracking-wider">Legal</h4>
                            <ul className="space-y-4">
                                <li><a className="text-body-sm text-on-surface-variant hover:text-secondary underline transition-all" href="#">Privacidad</a></li>
                                <li><a className="text-body-sm text-on-surface-variant hover:text-secondary underline transition-all" href="#">Términos</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};