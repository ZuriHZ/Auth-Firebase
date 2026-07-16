export type ProjectStatus = "activo" | "inactivo" | "mantenimiento";
export type TechStack = "React" | "Node.js" | "Python" | "TypeScript" | "Next.js" | "Firebase";

export interface Project {
  id: string;
  name: string;
  description: string;
  tech: TechStack[];
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
  icon: string;
}
