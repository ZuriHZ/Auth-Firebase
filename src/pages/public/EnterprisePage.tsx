import { Navbar } from "../../components/layout/Navbar";
import { Link } from "react-router-dom";
import { Flame, Shield, Users, Server, BarChart3, ChevronRight } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Seguridad Empresarial",
    description: "SSO/SAML, auditoría completa, y cumplimiento con estándares de seguridad.",
  },
  {
    icon: Users,
    title: "Gestión de Equipos",
    description: "Roles y permisos granulares, múltiples proyectos y colaboración en tiempo real.",
  },
  {
    icon: Server,
    title: "Infraestructura Dedicada",
    description: "Entornos aislados, alta disponibilidad y escalamiento automático.",
  },
  {
    icon: BarChart3,
    title: "Analíticas Avanzadas",
    description: "Métricas de uso, logs de auditoría y reportes personalizados.",
  },
];

export const Enterprise = () => {
  return (
    <div className="min-h-screen bg-background text-on-background">
      <Navbar />
      <main className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-body-sm font-medium mb-6">
            <Flame className="w-4 h-4" />
            <span>FireLabs Enterprise</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-display-lg text-on-surface mb-4">
            Para{" "}
            <span className="fire-text">Equipos Grandes</span>
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
            La plataforma completa para organizaciones que necesitan testing
            de Firebase a escala empresarial.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-on-secondary rounded-xl text-label-md font-label-md hover:opacity-90 transition-all"
          >
            Contactar Ventas
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 p-8 hover:border-secondary/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary/15 flex items-center justify-center mb-5">
                <f.icon className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-headline-md font-headline-md text-on-surface mb-3">
                {f.title}
              </h3>
              <p className="text-body-md text-on-surface-variant">{f.description}</p>
            </div>
          ))}
        </div>
      </main>
      <footer className="border-t border-outline-variant/20 py-8 text-center">
        <p className="text-body-sm text-on-surface-variant">
          &copy; 2026 FireLabs. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
};
