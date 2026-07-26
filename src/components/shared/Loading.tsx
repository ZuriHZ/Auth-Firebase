export const Loading = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background">
      <div className="relative flex flex-col items-center">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full bg-secondary/20 blur-2xl animate-pulse" />
          <div className="absolute inset-0 rounded-full bg-orange-500/10 blur-xl" />
          <div className="relative w-16 h-16 rounded-full border-[3px] border-secondary/10 border-t-secondary border-r-transparent animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-secondary text-2xl animate-pulse">
              local_fire_department
            </span>
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
