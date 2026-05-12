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
                        d="M9 12l2 2 4-4m5.618-4.016A11.96 11.96 0 0 1 12 2.944a11.96 11.96 0 0 1-8.618 3.04A12 12 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016"
                        strokeWidth={2}
                    />
                </svg>
            ),
            title: "Seguridad Avanzada",
            description:
                "Implementamos las mejores prácticas de seguridad con Firebase Authentication. Encriptación de extremo a extremo.",
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
                "Soluciones optimizadas para máxima velocidad y eficiencia en cada consulta y operación.",
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
                "Interfaces intuitivas y atractivas con las últimas tendencias en diseño y experiencia de usuario.",
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
            description: "Equipo técnico disponible para ayudarte en cada paso del proceso.",
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
            image: "https://ui-avatars.com/api/?name=Maria+Garcia&background=0058be&color=fff&size=200",
        },
        {
            name: "Carlos Ruiz",
            role: "CTO",
            image: "https://ui-avatars.com/api/?name=Carlos+Ruiz&background=2170e4&color=fff&size=200",
        },
        {
            name: "Ana López",
            role: "Diseñadora UX",
            image: "https://ui-avatars.com/api/?name=Ana+Lopez&background=0b1c30&color=fff&size=200",
        },
    ];

    return (
        <div className="min-h-screen bg-background text-on-background">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-b from-surface-container-lowest to-surface py-24 md:py-32 hero-pattern">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="max-w-[1280px] mx-auto px-[40px] text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto"
                    >
                        <h1 className="text-[48px] leading-[1.1] font-display-lg text-on-surface max-w-4xl mx-auto mb-6" style={{ letterSpacing: "-0.02em" }}>
                            Sobre Nosotros
                        </h1>
                        <p className="text-[18px] leading-[1.6] text-on-surface-variant max-w-2xl mx-auto">
                            Innovando en Tecnología y Seguridad para un futuro digital más seguro. AuthPro te ofrece soluciones de autenticación de nivel empresarial con Firebase.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-[1280px] mx-auto px-[40px] py-16">
                {/* Mission & Vision */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 gap-6 mb-16"
                >
                    <motion.div
                        variants={itemVariants}
                        className="bg-surface p-8 rounded-xl border border-outline-variant/50 shadow-sm"
                    >
                        <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-6 text-secondary">
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
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-[24px] leading-[1.3] font-headline-md text-on-surface mb-4" style={{ letterSpacing: "-0.01em" }}>
                            Nuestra Misión
                        </h2>
                        <p className="text-[16px] leading-[1.5] text-on-surface-variant">
                            Nos dedicamos a proporcionar soluciones de autenticación seguras y eficientes utilizando las últimas tecnologías como Firebase. Nuestro objetivo es hacer que la seguridad sea accesible y fácil de implementar para todos.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="bg-surface p-8 rounded-xl border border-outline-variant/50 shadow-sm"
                    >
                        <div className="w-12 h-12 rounded-lg bg-secondary-container/10 flex items-center justify-center mb-6 text-secondary-container">
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
                        <h2 className="text-[24px] leading-[1.3] font-headline-md text-on-surface mb-4" style={{ letterSpacing: "-0.01em" }}>
                            Nuestra Visión
                        </h2>
                        <p className="text-[16px] leading-[1.5] text-on-surface-variant">
                            Ser líderes en innovación tecnológica, ofreciendo herramientas que empoderen a desarrolladores y empresas para crear experiencias digitales seguras y excepcionales.
                        </p>
                    </motion.div>
                </motion.div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-inverse-surface rounded-2xl p-12 mb-16"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="text-[32px] font-display-lg text-secondary-fixed mb-2">{stat.number}</div>
                                <div className="text-label-md text-surface-variant uppercase tracking-widest">{stat.label}</div>
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
                    className="mb-16"
                >
                    <motion.div
                        variants={itemVariants}
                        className="text-center mb-12"
                    >
                        <h2 className="text-[32px] font-headline-lg text-on-surface mb-4" style={{ letterSpacing: "-0.015em" }}>
                            ¿Por Qué Elegirnos?
                        </h2>
                        <p className="text-[16px] text-on-surface-variant max-w-2xl mx-auto">
                            Ofrecemos soluciones completas con las mejores características del mercado.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-surface p-8 rounded-xl border border-outline-variant/50 hover:border-secondary/30 transition-all group shadow-sm"
                            >
                                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-6 text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                                    {feature.icon}
                                </div>
                                <h3 className="text-[24px] leading-[1.3] font-headline-md text-on-surface mb-4" style={{ letterSpacing: "-0.01em" }}>
                                    {feature.title}
                                </h3>
                                <p className="text-[16px] text-on-surface-variant">
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
                    className="mb-16"
                >
                    <motion.div
                        variants={itemVariants}
                        className="text-center mb-12"
                    >
                        <h2 className="text-[32px] font-headline-lg text-on-surface mb-4" style={{ letterSpacing: "-0.015em" }}>
                            Nuestro Equipo
                        </h2>
                        <p className="text-[16px] text-on-surface-variant max-w-2xl mx-auto">
                            Profesionales apasionados dedicados a tu éxito.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/30 shadow-sm hover:shadow-md transition-all"
                            >
                                <div className="aspect-square overflow-hidden">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-6 text-center">
                                    <h3 className="text-[24px] font-headline-md text-on-surface mb-1" style={{ letterSpacing: "-0.01em" }}>
                                        {member.name}
                                    </h3>
                                    <p className="text-secondary font-medium text-body-sm">
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
                    className="relative bg-gradient-to-br from-secondary to-[#004395] rounded-3xl p-12 md:p-20 text-center text-on-secondary overflow-hidden shadow-xl"
                >
                    <div className="relative z-10">
                        <h2 className="text-[48px] leading-[1.1] font-display-lg mb-6 text-white" style={{ letterSpacing: "-0.02em" }}>
                            ¿Listo para comenzar?
                        </h2>
                        <p className="text-[18px] leading-[1.6] mb-10 text-white/80 max-w-2xl mx-auto">
                            Únete a miles de usuarios que confían en AuthPro para sus soluciones de autenticación.
                        </p>
                        <button className="bg-white text-secondary px-10 py-4 rounded-xl text-[24px] font-headline-md hover:bg-surface-container-lowest active:scale-95 transition-all shadow-lg">
                            Contáctanos Ahora
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
