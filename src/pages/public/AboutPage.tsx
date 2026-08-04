import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Flame, Target, Zap, Users, Globe } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Misión Clara",
    description:
      "Simplificar el testing de Firebase para que cada desarrollador pueda construir con confianza, sin miedo a romper producción.",
  },
  {
    icon: Zap,
    title: "Velocidad ante Todo",
    description:
      "Un entorno sandbox que se levanta en segundos. Sin configuraciones complicadas, sin esperas innecesarias.",
  },
  {
    icon: Users,
    title: "Comunidad Primero",
    description:
      "Construido por developers, para developers. Escuchamos feedback y evolucionamos constantemente.",
  },
  {
    icon: Globe,
    title: "Alcance Global",
    description:
      "Disponible en más de 25 países con infraestructura distribuida para baja latencia en cualquier región.",
  },
];

export const About = () => {
  return (
    <div className="min-h-screen bg-background text-on-background">
      <Navbar />
      <main className="max-w-[1200px] mx-auto px-6 py-24">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-body-sm font-medium mb-6">
            <Flame className="w-4 h-4" />
            <span>Sobre Nosotros</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-display-lg text-on-surface mb-4">
            Construyendo el{" "}
            <span className="fire-text">Futuro del Testing</span>
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            FireLabs nació de una frustración simple: probar servicios de
            Firebase en producción es arriesgado, y los emuladores locales no
            siempre replican el comportamiento real.
          </p>
        </div>

        {/* Story Section */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 p-8 md:p-10">
            <h2 className="text-headline-md font-headline-md text-on-surface mb-4">
              Nuestra Historia
            </h2>
            <div className="space-y-4 text-body-md text-on-surface-variant leading-relaxed">
              <p>
                Empezamos como un proyecto interno en 2025 cuando nuestro equipo
                necesitaba una forma segura de probar flujos de autenticación
                complejos sin tocar la base de datos de producción.
              </p>
              <p>
                Lo que comenzó como un script simple se convirtió en una
                plataforma completa que hoy usan más de 50,000 desarrolladores
                en todo el mundo para experimentar, aprender y validar sus
                implementaciones de Firebase.
              </p>
              <p>
                Creemos que cada developer debería tener acceso a un entorno de
                pruebas de primer nivel, sin importar el tamaño de su equipo o
                presupuesto. Por eso FireLabs tiene un plan gratuito generoso y
                una comunidad abierta.
              </p>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="mb-20">
          <h2 className="text-headline-lg font-headline-lg text-on-surface text-center mb-12">
            Nuestros <span className="fire-text">Valores</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 p-8 hover:border-secondary/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/15 flex items-center justify-center mb-5">
                  <v.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-headline-md font-headline-md text-on-surface mb-3">
                  {v.title}
                </h3>
                <p className="text-body-md text-on-surface-variant">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
          {[
            { value: "50k+", label: "Developers" },
            { value: "25+", label: "Países" },
            { value: "99.9%", label: "Uptime" },
            { value: "2025", label: "Fundado" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl md:text-4xl font-display-lg fire-text font-bold mb-1">
                {stat.value}
              </div>
              <div className="text-label-md font-label-md text-on-surface-variant uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};
