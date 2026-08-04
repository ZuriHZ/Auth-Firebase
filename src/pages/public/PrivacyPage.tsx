import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Shield } from "lucide-react";

export const Privacy = () => {
  return (
    <div className="min-h-screen bg-background text-on-background">
      <Navbar />
      <main className="max-w-[800px] mx-auto px-6 py-24">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-14 h-14 rounded-2xl bg-secondary/15 flex items-center justify-center">
            <Shield className="w-7 h-7 text-secondary" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-display-lg text-on-surface">
              Política de Privacidad
            </h1>
            <p className="text-body-sm text-on-surface-variant">
              Última actualización: 15 de Julio, 2026
            </p>
          </div>
        </div>

        <div className="space-y-8 text-body-md text-on-surface-variant leading-relaxed">
          <section>
            <h2 className="text-headline-md font-headline-md text-on-surface mb-4">
              1. Información que Recopilamos
            </h2>
            <p>
              Recopilamos información de registro (nombre, email) y datos de uso
              de la plataforma para mejorar nuestros servicios. No almacenamos
              contraseñas en texto plano.
            </p>
          </section>

          <section>
            <h2 className="text-headline-md font-headline-md text-on-surface mb-4">
              2. Uso de la Información
            </h2>
            <p>
              Usamos tu información para proporcionar, mantener y mejorar
              FireLabs, así como para comunicarnos sobre actualizaciones y
              cambios en el servicio.
            </p>
          </section>

          <section>
            <h2 className="text-headline-md font-headline-md text-on-surface mb-4">
              3. Compartición de Datos
            </h2>
            <p>
              No vendemos tu información personal a terceros. Podemos compartir
              datos anonimizados para análisis o con proveedores de servicios
              esenciales para la plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-headline-md font-headline-md text-on-surface mb-4">
              4. Tus Derechos
            </h2>
            <p>
              Puedes solicitar acceso, corrección o eliminación de tus datos en
              cualquier momento desde la configuración de tu cuenta o
              contactándonos.
            </p>
          </section>

          <section>
            <h2 className="text-headline-md font-headline-md text-on-surface mb-4">
              5. Contacto
            </h2>
            <p>
              Para consultas sobre privacidad:{" "}
              <a href="mailto:privacy@firelabs.dev" className="text-secondary hover:underline">
                privacy@firelabs.dev
              </a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};
