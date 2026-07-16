import { motion } from "framer-motion";
import {
  Globe,
  BarChart3,
  Shield,
  Smartphone,
  ShoppingCart,
  FileText,
  Database,
  MessageCircle,
  Folder,
  type LucideIcon,
} from "lucide-react";
import type { Project, ProjectStatus, TechStack } from "../types";

const iconMap: Record<string, LucideIcon> = {
  Globe,
  BarChart3,
  Shield,
  Smartphone,
  ShoppingCart,
  FileText,
  Database,
  MessageCircle,
};

const techColors: Record<TechStack, string> = {
  React: "#61dafb",
  "Node.js": "#339933",
  Python: "#3776AB",
  TypeScript: "#3178C6",
  "Next.js": "#000000",
  Firebase: "#FFCA28",
};

const statusStyles: Record<ProjectStatus, string> = {
  activo: "bg-success/10 text-success",
  inactivo: "bg-on-surface/10 text-on-surface-variant",
  mantenimiento: "bg-warning/10 text-warning",
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const IconComponent = iconMap[project.icon] || Folder;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 p-5 md:p-6 hover:border-outline-variant/40 transition-all"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
          <IconComponent className="w-5 h-5 text-secondary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-headline-sm font-display-md text-on-surface truncate">
              {project.name}
            </h3>
            <span className={`text-body-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${statusStyles[project.status]}`}>
              {project.status}
            </span>
          </div>
          <p className="text-body-sm text-on-surface-variant line-clamp-2 mb-3">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-body-xs px-2 py-0.5 rounded-full font-medium"
                style={{
                  backgroundColor: `${techColors[t]}1A`,
                  color: techColors[t],
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
