import { Navbar } from "../components/Navbar";
import { Scale } from "lucide-react";

export const Terms = () => {
  return (
    <div className="min-h-screen bg-background text-on-background">
      <Navbar />
      <main className="max-w-[800px] mx-auto px-6 py-24">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-14 h-14 rounded-2xl bg-secondary/15 flex items-center justify-center">
            <Scale className="w-7 h-7 text-secondary" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-display-lg text-on-surface">
              Términos del Servicio
            </h1>
            <p className="text-body-sm text-on-surface-variant">
              Última actualización: 15 de Julio, 2026
            </p>
          </div>
        </div>

        <div className="space-y-8 text-body-md text-on-surface-variant leading-relaxed">
          <section>
            <h2 className="text-headline-md font-headline-md text-on-surface mb-4">
              1. Aceptación de Términos
            </h2>
            <p>
              Al acceder y usar FireLabs, aceptas cumplir con estos términos
              de servicio. Si no estás de acuerdo, no uses la plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-headline-md font-headline-md text-on-surface mb-4">
              2. Uso del Servicio
            </h2>
            <p>
              FireLabs proporciona un sandbox para testing de Firebase. El uso
              indebido de la plataforma para actividades ilegales resultará en
              la suspensión inmediata de la cuenta.
            </p>
          </section>

          <section>
            <h2 className="text-headline-md font-headline-md text-on-surface mb-4">
              3. Limitación de Responsabilidad
            </h2>
            <p>
              FireLabs no se responsabiliza por daños directos o indirectos
              derivados del uso de la plataforma. El servicio se proporciona
              "tal cual" sin garantías de ningún tipo.
            </p>
          </section>

          <section>
            <h2 className="text-headline-md font-headline-md text-on-surface mb-4">
              4. Privacidad
            </h2>
            <p>
              Consulta nuestra{" "}
              <a href="/privacy" className="text-secondary hover:underline">
                Política de Privacidad
              </a>{" "}
              para entender cómo manejamos tus datos.
            </p>
          </section>

          <section>
            <h2 className="text-headline-md font-headline-md text-on-surface mb-4">
              5. Contacto
            </h2>
            <p>
              Para preguntas sobre estos términos, contáctanos en{" "}
              <a href="mailto:legal@firelabs.dev" className="text-secondary hover:underline">
                legal@firelabs.dev
              </a>
            </p>
          </section>
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
