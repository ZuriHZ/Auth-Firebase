import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const HomeTemplate = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    const features = [
        {
            title: "Seguridad Robusta",
            description:
                "Protección de datos de nivel empresarial con Firebase Authentication.",
            icon: (
                <svg
                    className="w-6 h-6"
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
            ),
        },
        {
            title: "Fácil Integración",
            description:
                "API intuitiva y documentación clara para empezar en minutos.",
            icon: (
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 4a2 2 0 114 0v1a2 2 0 11-4 0V4zM11 13a2 2 0 114 0v1a2 2 0 11-4 0v-1zM11 19a2 2 0 114 0v1a2 2 0 11-4 0v-1zM5 4a2 2 0 114 0v1a2 2 0 11-4 0V4zM5 13a2 2 0 114 0v1a2 2 0 11-4 0v-1zM5 19a2 2 0 114 0v1a2 2 0 11-4 0v-1z"
                    />
                </svg>
            ),
        },
        {
            title: "Escalabilidad Total",
            description:
                "Preparado para crecer desde pequeños proyectos hasta grandes empresas.",
            icon: (
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                </svg>
            ),
        },
    ];

    const stats = [
        { label: "Usuarios Activos", value: "50k+" },
        { label: "Disponibilidad", value: "99.9%" },
        { label: "Países", value: "25+" },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-950">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
                            Autenticación{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                                Simplificada
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
                            La plataforma más completa y segura para gestionar
                            la identidad de tus usuarios en la nube.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link
                                to="/register"
                                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
                            >
                                Comenzar Gratis
                            </Link>
                            <Link
                                to="/about"
                                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-full font-bold text-lg transition-all backdrop-blur-sm"
                            >
                                Saber Más
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                    <svg
                        className="relative block w-full h-[100px]"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58,117.26,171.19,103.11,217.44,91C252.68,81.75,284.14,63.15,321.39,56.44Z"
                            fill="#FFFFFF"
                        ></path>
                    </svg>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="grid md:grid-cols-3 gap-12"
                    >
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                className="p-8 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-2xl transition-all border border-gray-100 group"
                            >
                                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="bg-gray-900 py-16">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="text-center">
                                <div className="text-4xl md:text-5xl font-black text-blue-400 mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-gray-400 font-medium uppercase tracking-widest text-sm">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>

                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                                ¿Listo para transformar tu app?
                            </h2>
                            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
                                Únete a los miles de desarrolladores que ya
                                están construyendo el futuro con nuestra
                                infraestructura.
                            </p>
                            <button className="px-10 py-5 bg-white text-blue-600 hover:bg-gray-100 rounded-full font-black text-xl transition-all transform hover:scale-105 shadow-xl">
                                Crear Cuenta Ahora
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer-like simple area */}
            <footer className="py-12 border-t border-gray-100">
                <div className="container mx-auto px-6 text-center text-gray-500">
                    <p>
                        © 2026 Auth Solutions Inc. Todos los derechos
                        reservados.
                    </p>
                </div>
            </footer>
        </div>
    );
};
