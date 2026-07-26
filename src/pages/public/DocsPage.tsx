import { Navbar } from "../../components/layout/Navbar";
import { BookOpen, FileText, ExternalLink } from "lucide-react";

const sections = [
  {
    title: "Primeros Pasos",
    items: [
      "¿Qué es FireLabs?",
      "Beneficios para tu empresa",
      "Casos de éxito",
      "Integración rápida",
    ],
  },
  {
    title: "Soluciones",
    items: [
      "Autenticación para Startups",
      "Bases de datos seguras",
      "Escalabilidad global",
      "Cumplimiento y Privacidad",
    ],
  },
];

export const Docs = () => {
  return (
    <div className="min-h-screen bg-background text-on-background">
      <Navbar />
      <main className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-14 h-14 rounded-2xl bg-secondary/15 flex items-center justify-center">
            <BookOpen className="w-7 h-7 text-secondary" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-display-lg text-on-surface">
              Documentación
            </h1>
            <p className="text-body-lg text-on-surface-variant">
              Información general y soluciones empresariales de FireLabs.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {sections.map((section) => (
            <div
              key={section.title}
              className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 p-8"
            >
              <h2 className="text-headline-md font-headline-md text-on-surface mb-6 flex items-center gap-3">
                <FileText className="w-5 h-5 text-secondary" />
                {section.title}
              </h2>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="flex items-center gap-2 text-body-md text-on-surface-variant hover:text-secondary transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
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
