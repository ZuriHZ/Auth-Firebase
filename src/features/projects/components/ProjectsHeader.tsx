import { Plus } from "lucide-react";

export const ProjectsHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-headline-lg md:text-display-lg font-display-lg fire-text">
          Proyectos
        </h1>
        <p className="text-body-lg text-on-surface-variant mt-1">
          Gestiona tus proyectos desde aquí
        </p>
      </div>
      <button className="bg-secondary text-on-secondary rounded-xl hover:opacity-90 active:scale-[0.97] transition-all flex items-center gap-2 px-4 py-2.5">
        <Plus className="w-4 h-4" />
        <span className="text-body-sm font-medium hidden sm:inline">Nuevo Proyecto</span>
      </button>
    </div>
  );
};
