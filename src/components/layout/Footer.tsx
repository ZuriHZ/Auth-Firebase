import { Link } from "react-router-dom";
import { Flame } from "lucide-react";

const footerLinks: Record<string, { name: string; href: string }[]> = {
  Recursos: [
    { name: "Documentación", href: "/docs" },
    { name: "API Reference", href: "/docs" },
    { name: "Precios", href: "/pricing" },
  ],
  Empresa: [
    { name: "Nosotros", href: "/about" },
    { name: "Enterprise", href: "/enterprise" },
    { name: "Contacto", href: "/contact" },
  ],
  Legal: [
    { name: "Privacidad", href: "/privacy" },
    { name: "Términos", href: "/terms" },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/20 py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group">
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
                    <Link
                      to={link.href}
                      className="text-body-sm text-on-surface-variant hover:text-secondary transition-colors"
                    >
                      {link.name}
                    </Link>
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
            <Link
              to="/privacy"
              className="text-body-sm text-on-surface-variant hover:text-secondary transition-colors"
            >
              Política de Privacidad
            </Link>
            <Link
              to="/terms"
              className="text-body-sm text-on-surface-variant hover:text-secondary transition-colors"
            >
              Términos del Servicio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
