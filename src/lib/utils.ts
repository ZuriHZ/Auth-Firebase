// ------------------------------------------------
// cn() — Utilidad de clases condicionales
// ------------------------------------------------
//
// Combina clsx (concatena clases condicionalmente) con
// twMerge (resuelve conflictos de Tailwind).
//
// Ejemplo:
//   cn("px-4 py-2", isActive && "bg-blue-500", "px-6")
//   -> si isActive es true: "py-2 bg-blue-500 px-6"
//      (twMerge se queda con el último px-6, descarta px-4)
//
// Es el estándar de Shadcn/ui para manejar clases Tailwind.
// Sin twMerge, tener "px-4" y "px-6" dejaría ambas (bug).

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
