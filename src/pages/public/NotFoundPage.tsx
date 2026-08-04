import { Link } from "react-router-dom";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Flame, ArrowLeft } from "lucide-react";

export const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-background text-on-background">
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] px-6 text-center">
        {/* Decorative background elements */}
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-fire-accent/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10">
          {/* Fire icon */}
          <div className="w-20 h-20 rounded-2xl bg-secondary/15 flex items-center justify-center mx-auto mb-8">
            <Flame className="w-10 h-10 text-secondary" />
          </div>

          {/* 404 number */}
          <h1 className="text-8xl md:text-9xl font-display-lg font-extrabold fire-text mb-4 tracking-tighter">
            404
          </h1>

          {/* Message */}
          <h2 className="text-headline-lg md:text-display-lg font-headline-lg text-on-surface mb-4">
            Página no encontrada
          </h2>
          <p className="text-body-lg text-on-surface-variant max-w-md mx-auto mb-10 leading-relaxed">
            Lo sentimos, la página que buscás no existe o fue movida a otra
            ubicación.
          </p>

          {/* CTA */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-on-secondary rounded-xl text-label-md font-label-md hover:opacity-90 active:scale-[0.97] transition-all shadow-sm shadow-secondary/20"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Inicio
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};
