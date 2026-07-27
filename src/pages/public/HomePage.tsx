import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Shield,
  Wifi,
  Database,
  Flame,
  ChevronRight,
  ExternalLink,
  Server,
  Cloud,
} from "lucide-react";
import { Navbar } from "../../components/layout/Navbar";
import { useAuth } from "../../context/AuthContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const tools = [
  {
    title: "Authentication",
    description:
      "Test flujos de login, MFA, social providers y reglas de seguridad en un entorno sandbox controlado.",
    icon: Shield,
    gradient: "from-orange-500/20 to-amber-500/10",
    borderColor: "border-orange-500/30 group-hover:border-orange-400/60",
  },
  {
    title: "Firestore",
    description:
      "Explora colecciones, documentos y consultas en tiempo real. Edita datos y prueba reglas de seguridad.",
    icon: Wifi,
    gradient: "from-cyan-500/20 to-blue-500/10",
    borderColor: "border-cyan-500/30 group-hover:border-cyan-400/60",
  },
  {
    title: "Realtime Database",
    description:
      "Visualiza y simula operaciones en la base de datos en tiempo real con un editor JSON interactivo.",
    icon: Database,
    gradient: "from-emerald-500/20 to-teal-500/10",
    borderColor: "border-emerald-500/30 group-hover:border-emerald-400/60",
  },
];

const stats = [
  { label: "Usuarios Activos", value: "50k+" },
  { label: "Disponibilidad", value: "99.9%" },
  { label: "Países", value: "25+" },
];

const footerLinks: Record<string, { name: string; href: string }[]> = {
  Recursos: [
    { name: "Documentación", href: "/docs" },
    { name: "API Reference", href: "/docs" },
    { name: "Precios", href: "/pricing" },
    { name: "Soporte", href: "#" },
  ],
  Empresa: [
    { name: "Nosotros", href: "/about" },
    { name: "Blog", href: "#" },
    { name: "Enterprise", href: "/enterprise" },
    { name: "Contacto", href: "#" },
  ],
  Legal: [
    { name: "Privacidad", href: "/privacy" },
    { name: "Términos", href: "/terms" },
    { name: "Seguridad", href: "#" },
    { name: "Cookies", href: "#" },
  ],
};

export const Home = () => {
  const { user } = useAuth();
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-surface text-on-surface overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden circuit-pattern">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-secondary/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-fire-accent/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-b from-surface via-surface/50 to-surface pointer-events-none" />

          <div className="absolute top-20 right-20 opacity-20 hidden lg:block">
            <Server className="w-24 h-24 text-secondary" />
          </div>
          <div className="absolute bottom-20 left-20 opacity-15 hidden lg:block">
            <Cloud className="w-20 h-20 text-fire-accent" />
          </div>

          <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-body-sm font-medium mb-8">
                <Flame className="w-4 h-4" />
                <span>Plataforma Sandbox para Firebase</span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display-lg text-on-surface max-w-5xl mx-auto mb-6 leading-[1.05] tracking-tighter">
                Domina tu{" "}
                <span className="fire-text">Viaje con Firebase</span>
              </h1>

              <p className="text-body-lg md:text-headline-md text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed">
                Una plataforma sandbox completa para probar, explorar y dominar
                las herramientas y servicios de Firebase. Construye con confianza.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to={user ? "/dashboard" : "/register"}
                  className="group relative inline-flex items-center gap-2 px-8 py-4 bg-secondary text-on-secondary rounded-xl text-label-md font-label-md overflow-hidden transition-all hover:shadow-lg hover:shadow-secondary/25 active:scale-[0.97]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Explorar Sandbox
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-surface-container-low text-on-surface border border-outline-variant/50 rounded-xl text-label-md font-label-md hover:bg-surface-container transition-all active:scale-[0.97]"
                >
                  Saber Más
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>

              <div className="mt-20 max-w-4xl mx-auto">
                <div className="relative rounded-2xl overflow-hidden border border-outline-variant/30 bg-gradient-to-b from-surface-container to-surface-container-low shadow-level-2">
                  <div className="absolute inset-0 hero-pattern opacity-50" />
                  <div className="relative p-6 md:p-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                      </div>
                      <span className="text-body-sm text-on-surface-variant font-mono">
                        FireLabs Sandbox — Terminal
                      </span>
                    </div>
                    <div className="space-y-3 font-mono text-body-sm text-left">
                      <p className="text-on-surface-variant">
                        <span className="text-secondary">$</span> firebase
                        sandbox:init
                      </p>
                      <p className="text-fire-accent">
                        {"/"} Inicializando entorno sandbox de Firebase...
                      </p>
                      <p className="text-emerald-400">
                        ✓ Módulo de autenticación listo
                      </p>
                      <p className="text-emerald-400">
                        ✓ Emulador de Firestore conectado
                      </p>
                      <p className="text-emerald-400">
                        ✓ Realtime Database sincronizada
                      </p>
                      <p className="text-on-surface-variant">
                        <span className="text-secondary">$</span>{" "}
                        <span className="animate-blink">▊</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-surface to-transparent pointer-events-none" />
        </section>

        {/* Tools Section */}
        <section className="py-24 md:py-32 bg-surface-container-lowest">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container border border-outline-variant/30 text-on-surface-variant text-body-sm font-medium mb-6">
                  <Server className="w-4 h-4" />
                  <span>Impulsado por Firebase</span>
                </div>
                <h2 className="text-headline-lg md:text-display-lg font-display-lg text-on-surface mb-4">
                  Herramientas que{" "}
                  <span className="fire-text">Soportamos</span>
                </h2>
                <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto">
                  Cada servicio de Firebase que necesitas, disponible en un solo
                  entorno sandbox para pruebas y experimentación.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6">
                {tools.map((tool, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="group relative p-8 rounded-2xl bg-surface border border-outline-variant/30 hover:border-secondary/30 transition-all duration-500 overflow-hidden"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6 text-secondary group-hover:bg-secondary/20 transition-colors">
                        <tool.icon className="w-7 h-7" />
                      </div>
                      <h3 className="text-headline-md font-headline-md text-on-surface mb-3">
                        {tool.title}
                      </h3>
                      <p className="text-body-md text-on-surface-variant leading-relaxed">
                        {tool.description}
                      </p>
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-secondary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-surface border-y border-outline-variant/20">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-12"
            >
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="text-center"
                >
                  <div className="text-5xl md:text-6xl font-display-lg fire-text mb-3 font-bold">
                    {stat.value}
                  </div>
                  <div className="text-label-md font-label-md text-on-surface-variant uppercase tracking-widest">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-secondary via-secondary-container to-error/80 p-12 md:p-20 text-center"
            >
              <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -mr-36 -mt-36 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-black/5 rounded-full -ml-36 -mb-36 blur-3xl" />

              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-display-lg text-white mb-6">
                  ¿Listo para Transformar tu App?
                </h2>
                <p className="text-body-lg md:text-headline-md text-white/80 max-w-2xl mx-auto mb-10">
                  Únete a miles de desarrolladores que ya están construyendo el
                  futuro con Firebase. Empieza a probar en tu sandbox hoy.
                </p>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-10 py-4 bg-white text-secondary rounded-xl text-label-md font-label-md hover:bg-white/90 active:scale-[0.97] transition-all shadow-xl hover:shadow-2xl"
                >
                  Crear Cuenta Ahora
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-surface-container-lowest border-t border-outline-variant/20 py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div className="col-span-2 md:col-span-1">
                <Link
                  to="/"
                  className="flex items-center gap-2.5 mb-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center group-hover:bg-secondary/25 transition-colors">
                    <Flame className="w-6 h-6 text-secondary" />
                  </div>
                  <span className="text-headline-md font-headline-lg text-on-surface fire-text">
                    FireLabs
                  </span>
                </Link>
                <p className="text-body-sm text-on-surface-variant max-w-xs leading-relaxed">
                  Una plataforma sandbox completa para que los desarrolladores
                  prueben, exploren y dominen herramientas cloud.
                </p>
              </div>

              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category}>
                  <h4 className="text-label-md font-label-md text-on-surface mb-4 uppercase tracking-wider">
                    {category}
                  </h4>
                  <ul className="space-y-3">
                    {links.map((link) => (
                      <li key={link.name}>
                        {link.href.startsWith("/") ? (
                          <Link
                            to={link.href}
                            className="text-body-sm text-on-surface-variant hover:text-secondary transition-colors"
                          >
                            {link.name}
                          </Link>
                        ) : (
                          <a
                            href={link.href}
                            className="text-body-sm text-on-surface-variant hover:text-secondary transition-colors"
                          >
                            {link.name}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-body-sm text-on-surface-variant">
                &copy; 2026 FireLabs. Todos los derechos reservados.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="#"
                  className="text-body-sm text-on-surface-variant hover:text-secondary transition-colors"
                >
                  Política de Privacidad
                </a>
                <a
                  href="#"
                  className="text-body-sm text-on-surface-variant hover:text-secondary transition-colors"
                >
                  Términos del Servicio
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};
