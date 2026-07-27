import { Navbar } from "../../components/layout/Navbar";
import { Mail, MessageSquare, MapPin } from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    value: "hassamzuriel01@gmail.com",
    href: "mailto:hassamzuriel01@gmail.com",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp",
    value: "Enviar mensaje",
    href: "https://wa.me/5491100000000",
  },
  {
    icon: MapPin,
    title: "Ubicación",
    value: "Buenos Aires, Argentina",
    href: null,
  },
];

export const Contact = () => {
  return (
    <div className="min-h-screen bg-background text-on-background">
      <Navbar />
      <main className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-body-sm font-medium mb-6">
            <Mail className="w-4 h-4" />
            <span>Contáctanos</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-display-lg text-on-surface mb-4">
            Hablemos <span className="fire-text">Juntos</span>
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            ¿Tenés una pregunta, sugerencia o querés colaborar? Nos encantaría
            escucharte.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          {contactMethods.map((method) => (
            <div
              key={method.title}
              className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 p-8 text-center hover:border-secondary/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary/15 flex items-center justify-center mx-auto mb-5">
                <method.icon className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-headline-md font-headline-md text-on-surface mb-2">
                {method.title}
              </h3>
              {method.href ? (
                <a
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-md text-secondary hover:underline"
                >
                  {method.value}
                </a>
              ) : (
                <p className="text-body-md text-on-surface-variant">
                  {method.value}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto bg-surface-container-lowest rounded-2xl border border-outline-variant/20 p-8">
          <h2 className="text-headline-md font-headline-md text-on-surface mb-6 text-center">
            Envianos un mensaje
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const data = new FormData(form);
              const name = data.get("name");
              const email = data.get("email");
              const message = data.get("message");
              window.open(
                `mailto:hassamzuriel01@gmail.com?subject=${encodeURIComponent(
                  `FireLabs - Mensaje de ${name}`
                )}&body=${encodeURIComponent(
                  `Nombre: ${name}\nEmail: ${email}\n\n${message}`
                )}`,
                "_blank"
              );
            }}
            className="space-y-5"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-body-sm text-on-surface-variant mb-1.5"
              >
                Nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 bg-surface-container border border-outline-variant/30 rounded-xl text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-secondary transition-colors"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-body-sm text-on-surface-variant mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 bg-surface-container border border-outline-variant/30 rounded-xl text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-secondary transition-colors"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-body-sm text-on-surface-variant mb-1.5"
              >
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full px-4 py-3 bg-surface-container border border-outline-variant/30 rounded-xl text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-secondary transition-colors resize-none"
                placeholder="Contanos en qué te podemos ayudar..."
              />
            </div>
            <button
              type="submit"
              className="w-full px-8 py-3.5 bg-secondary text-on-secondary rounded-xl text-label-md font-label-md hover:opacity-90 transition-all"
            >
              Enviar Mensaje
            </button>
          </form>
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
