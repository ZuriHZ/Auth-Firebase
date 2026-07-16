import { Search } from "lucide-react";
import type { ProjectStatus } from "../types";

const filterOptions: { label: string; value: ProjectStatus | "todos" }[] = [
  { label: "Todos", value: "todos" },
  { label: "Activo", value: "activo" },
  { label: "Inactivo", value: "inactivo" },
  { label: "Mantenimiento", value: "mantenimiento" },
];

interface ProjectFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeFilter: ProjectStatus | "todos";
  onFilterChange: (value: ProjectStatus | "todos") => void;
}

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/50" />
        <input
          type="text"
          placeholder="Buscar proyectos..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl w-full pl-10 pr-4 py-2.5 text-body-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
        />
      </div>
      <div className="flex gap-2 flex-wrap">
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onFilterChange(opt.value)}
            className={`px-3.5 py-2 rounded-xl text-body-sm font-medium transition-all ${
              activeFilter === opt.value
                ? "bg-secondary text-on-secondary"
                : "bg-surface-container-lowest text-on-surface-variant border border-outline-variant/30 hover:border-outline-variant/50"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};
