// ------------------------------------------------
// LOADING — Pantalla de carga inicial
// ------------------------------------------------
//
// Se muestra solo en la PRIMERA carga de la app
// mientras Firebase Auth verifica la sesión.
// La lógica está en AuthContext: loading se mantiene
// true hasta que onAuthStateChanged resuelva, y
// showSplash (sessionStorage) evita repetirlo.
//
// Tiene un spinner circular con glow, el logo de FireLabs
// con gradiente naranja y un texto "Cargando..." animado.
// El uso de blur-2xl y múltiples capas crea un efecto de
// brillo detrás del spinner (glow effect).

export const Loading = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background">
      <div className="relative flex flex-col items-center">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full bg-secondary/20 blur-2xl animate-pulse" />
          <div className="absolute inset-0 rounded-full bg-orange-500/10 blur-xl" />
          <div className="relative w-16 h-16 rounded-full border-[3px] border-secondary/10 border-t-secondary border-r-transparent animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 text-secondary animate-pulse"
            >
              <path d="M12 23c-4.97 0-9-2.69-9-6 0-2.22 1.35-4.15 3.25-5.25C8.15 10.55 10 8.7 10 6c0-2.21.89-4.22 2.34-5.66A.5.5 0 0 1 13 1v4.59a.5.5 0 0 0 .85.35L16 3.59a.5.5 0 0 1 .87.34v2.07a.5.5 0 0 0 .85.35L20 4.34a.5.5 0 0 1 .87.34c.8 3.57.13 6.57-1.03 8.56C20.66 14.87 21 15.9 21 17c0 3.31-4.03 6-9 6z" />
            </svg>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-2">
          <span className="text-headline-md font-display-lg bg-gradient-to-r from-[#f97316] via-[#fb923c] to-[#fbbf24] bg-clip-text text-transparent">
            FireLabs
          </span>
        </div>
        <p className="mt-2 text-body-sm text-on-surface-variant/60 animate-pulse">
          Cargando...
        </p>
      </div>
    </div>
  );
};
