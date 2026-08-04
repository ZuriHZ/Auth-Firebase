import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Link } from "react-router-dom";
import { Flame, Check, ChevronRight } from "lucide-react";

const plans = [
  {
    name: "Gratuito",
    price: "Free",
    description: "Perfecto para empezar a explorar Firebase",
    features: [
      "Sandbox básico",
      "Pruebas de autenticación",
      "1 proyecto",
      "Soporte comunitario",
    ],
    cta: "Comenzar Gratis",
    href: "/register",
    featured: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mes",
    description: "Para desarrolladores profesionales",
    features: [
      "Sandbox ilimitado",
      "Auth Lab completo",
      "Explorador de Firestore",
      "10 proyectos",
      "Soporte prioritario",
      "Funciones de equipo",
    ],
    cta: "Empezar Prueba",
    href: "/register",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/mes",
    description: "Para equipos y organizaciones",
    features: [
      "Todo lo de Pro",
      "Proyectos ilimitados",
      "SSO / SAML",
      "Registros de auditoría",
      "SLA 99.99%",
      "Soporte dedicado 24/7",
    ],
    cta: "Contactar Ventas",
    href: "/enterprise",
    featured: false,
  },
];

export const Pricing = () => {
  return (
    <div className="min-h-screen bg-background text-on-background">
      <Navbar />
      <main className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-body-sm font-medium mb-6">
            <Flame className="w-4 h-4" />
            <span>Planes Flexibles</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-display-lg text-on-surface mb-4">
            Precios <span className="fire-text">Simples</span>
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Elige el plan que mejor se adapte a tus necesidades. Todos incluyen
            acceso al sandbox de Firebase.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 border transition-all ${
                plan.featured
                  ? "bg-surface border-secondary/40 shadow-lg shadow-secondary/10 scale-105 md:scale-110"
                  : "bg-surface-container-lowest border-outline-variant/30 hover:border-outline-variant/60"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-secondary text-on-secondary text-label-md font-medium rounded-full">
                  Más popular
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-headline-md font-headline-md text-on-surface mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-display-lg fire-text">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-body-sm text-on-surface-variant">
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className="text-body-sm text-on-surface-variant mt-2">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 text-body-sm text-on-surface"
                  >
                    <Check className="w-4 h-4 text-secondary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                to={plan.href}
                className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-label-md font-label-md transition-all ${
                  plan.featured
                    ? "bg-secondary text-on-secondary hover:opacity-90"
                    : "bg-surface-container-low text-on-surface border border-outline-variant/30 hover:bg-surface-container"
                }`}
              >
                {plan.cta}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};
