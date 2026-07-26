import { useState, useMemo } from "react";
import { ProjectsHeader } from "./components/ProjectsHeader";
import { ProjectFilters } from "./components/ProjectFilters";
import { ProjectsGrid } from "./components/ProjectsGrid";
import { mockProjects } from "./data/mock";
import type { ProjectStatus } from "./types";

export const ProjectsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<ProjectStatus | "todos">("todos");

  const filteredProjects = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return mockProjects.filter((project) => {
      const matchesSearch =
        !query ||
        project.name.toLowerCase().includes(query) ||
        project.tech.some((t) => t.toLowerCase().includes(query));
      const matchesFilter =
        activeFilter === "todos" || project.status === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      <ProjectsHeader />
      <div className="space-y-6">
        <ProjectFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        <ProjectsGrid projects={filteredProjects} />
      </div>
    </div>
  );
};
