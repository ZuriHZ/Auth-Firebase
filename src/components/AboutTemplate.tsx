import { motion } from "framer-motion";

export const AboutTemplate = () => {
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
            icon: (
                <svg
                    fill="none"
                    stroke="currentColor"
                    className="w-8 h-8"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m9 12 2 2 4-4m5.618-4.016A11.96 11.96 0 0 1 12 2.944a11.96 11.96 0 0 1-8.618 3.04A12 12 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016"
                        strokeWidth={2}
                    />
                </svg>
            ),
            title: "Seguridad Avanzada",
            description:
                "Implementamos las mejores prácticas de seguridad con Firebase Authentication",
        },
        {
            icon: (
                <svg
                    fill="none"
                    stroke="currentColor"
                    className="w-8 h-8"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 10V3L4 14h7v7l9-11z"
                        strokeWidth={2}
                    />
                </svg>
            ),
            title: "Alto Rendimiento",
            description:
                "Soluciones optimizadas para máxima velocidad y eficiencia",
        },
        {
            icon: (
                <svg
                    fill="none"
                    stroke="currentColor"
                    className="w-8 h-8"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 21a4 4 0 0 1-4-4V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12a4 4 0 0 1-4 4m0 0h12a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 0 1 2.828 0l2.829 2.829a2 2 0 0 1 0 2.828l-8.486 8.485M7 17h.01"
                        strokeWidth={2}
                    />
                </svg>
            ),
            title: "Diseño Moderno",
            description:
                "Interfaces intuitivas y atractivas con las últimas tendencias",
        },
        {
            icon: (
                <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                </svg>
            ),
            title: "Soporte Dedicado",
            description: "Equipo técnico disponible para ayudarte en cada paso",
        },
    ];

    const stats = [
        { number: "99.9%", label: "Uptime" },
        { number: "10k+", label: "Usuarios" },
        { number: "24/7", label: "Soporte" },
        { number: "5★", label: "Calificación" },
    ];

    const team = [
        {
            name: "María García",
            role: "CEO & Fundadora",
            image: "https://ui-avatars.com/api/?name=Maria+Garcia&background=4F46E5&color=fff&size=200",
        },
        {
            name: "Carlos Ruiz",
            role: "CTO",
            image: "https://ui-avatars.com/api/?name=Carlos+Ruiz&background=7C3AED&color=fff&size=200",
        },
        {
            name: "Ana López",
            role: "Diseñadora UX",
            image: "https://ui-avatars.com/api/?name=Ana+Lopez&background=2563EB&color=fff&size=200",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
                            Sobre Nosotros
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                            Innovando en Tecnología y Seguridad para un futuro
                            digital más seguro
                        </p>
                    </motion.div>
                </div>
                {/* Decorative wave */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg
                        viewBox="0 0 1440 120"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full"
                    >
                        <path
                            d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
                            fill="rgb(239 246 255)"
                        />
                    </svg>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Mission & Vision */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 gap-8 mb-20"
                >
                    <motion.div
                        variants={itemVariants}
                        className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow"
                    >
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl w-16 h-16 flex items-center justify-center mb-6">
                            <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Nuestra Misión
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            Nos dedicamos a proporcionar soluciones de
                            autenticación seguras y eficientes utilizando las
                            últimas tecnologías como Firebase. Nuestro objetivo
                            es hacer que la seguridad sea accesible y fácil de
                            implementar para todos.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow"
                    >
                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl w-16 h-16 flex items-center justify-center mb-6">
                            <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Nuestra Visión
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            Ser líderes en innovación tecnológica, ofreciendo
                            herramientas que empoderen a desarrolladores y
                            empresas para crear experiencias digitales seguras y
                            excepcionales.
                        </p>
                    </motion.div>
                </motion.div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 mb-20 shadow-2xl"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-blue-100 text-sm md:text-base">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <motion.div
                        variants={itemVariants}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            ¿Por Qué Elegirnos?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Ofrecemos soluciones completas con las mejores
                            características del mercado
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{
                                    y: -8,
                                    transition: { duration: 0.2 },
                                }}
                                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all"
                            >
                                <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl w-16 h-16 flex items-center justify-center text-blue-600 mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Team Section */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <motion.div
                        variants={itemVariants}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Nuestro Equipo
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Profesionales apasionados dedicados a tu éxito
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -8 }}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
                            >
                                <div className="aspect-square overflow-hidden">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-6 text-center">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                                        {member.name}
                                    </h3>
                                    <p className="text-blue-600 font-medium">
                                        {member.role}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center shadow-2xl"
                >
                    <h2 className="text-4xl font-bold text-white mb-4">
                        ¿Listo para comenzar?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Únete a miles de usuarios que confían en nosotros para
                        sus soluciones de autenticación
                    </p>
                    <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform">
                        Contáctanos Ahora
                    </button>
                </motion.div>
            </div>
        </div>
    );
};
