// ------------------------------------------------
// DATOS SIMULADOS — Proyectos
// ------------------------------------------------
//
// Proyectos de ejemplo para mostrar en el portafolio.
// No están conectados a ninguna base de datos real.
// Solo son datos de muestra para demostrar la UI.

import type { Project } from "../types";

export const mockProjects: Project[] = [
  {
    id: "1",
    name: "Portal Web",
    description: "Portal web corporativo con blog, docs y área de clientes construido con Next.js y Firebase.",
    tech: ["React", "TypeScript", "Next.js", "Firebase"],
    status: "activo",
    createdAt: "2025-10-15",
    updatedAt: "2026-07-10",
    icon: "Globe",
  },
  {
    id: "2",
    name: "Dashboard Analytics",
    description: "Panel de análisis en tiempo real con gráficos interactivos y exportación de reportes.",
    tech: ["React", "TypeScript", "Node.js"],
    status: "activo",
    createdAt: "2026-01-20",
    updatedAt: "2026-07-14",
    icon: "BarChart3",
  },
  {
    id: "3",
    name: "API REST",
    description: "API RESTful para servicios internos con autenticación JWT y documentación OpenAPI.",
    tech: ["Node.js", "TypeScript", "Firebase"],
    status: "mantenimiento",
    createdAt: "2025-06-01",
    updatedAt: "2026-06-28",
    icon: "Shield",
  },
  {
    id: "4",
    name: "App Mobile",
    description: "Aplicación móvil multiplataforma para gestión de inventario en tiempo real.",
    tech: ["React", "TypeScript", "Firebase"],
    status: "inactivo",
    createdAt: "2025-03-10",
    updatedAt: "2026-02-15",
    icon: "Smartphone",
  },
  {
    id: "5",
    name: "E-commerce",
    description: "Tienda online con carrito de compras, pasarela de pago y panel de administración.",
    tech: ["React", "TypeScript", "Node.js"],
    status: "activo",
    createdAt: "2026-04-05",
    updatedAt: "2026-07-12",
    icon: "ShoppingCart",
  },
  {
    id: "6",
    name: "CMS Plataforma",
    description: "Sistema de gestión de contenido headless con editor visual y API pública.",
    tech: ["React", "TypeScript", "Next.js", "Firebase"],
    status: "activo",
    createdAt: "2025-11-01",
    updatedAt: "2026-07-13",
    icon: "FileText",
  },
  {
    id: "7",
    name: "Data Pipeline",
    description: "Pipeline ETL para procesamiento de datos masivos con schedules automatizados.",
    tech: ["Python", "TypeScript"],
    status: "inactivo",
    createdAt: "2025-08-12",
    updatedAt: "2026-01-30",
    icon: "Database",
  },
  {
    id: "8",
    name: "Chat en Tiempo Real",
    description: "Sistema de mensajería instantánea con salas, notificaciones push y archivos adjuntos.",
    tech: ["React", "Node.js", "Firebase"],
    status: "mantenimiento",
    createdAt: "2026-02-14",
    updatedAt: "2026-07-08",
    icon: "MessageCircle",
  },
];
