import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Palette } from "lucide-react";
import type { ThemeMode, AccentColor } from "../types";
import { mockAppearance } from "../data/mock";

const ACCENT_COLORS: { key: AccentColor; color: string; dark: string }[] = [
  { key: "orange", color: "#f97316", dark: "#ea580c" },
  { key: "purple", color: "#a855f7", dark: "#9333ea" },
  { key: "blue", color: "#3b82f6", dark: "#2563eb" },
  { key: "green", color: "#22c55e", dark: "#16a34a" },
  { key: "pink", color: "#ec4899", dark: "#db2777" },
];

const ACCENT_CSS = {
  orange: { primary: "#ff6b1a", secondary: "#fb923c", secondaryContainer: "#c2410c", ring: "#fb923c" },
  purple: { primary: "#a855f7", secondary: "#a855f7", secondaryContainer: "#7e22ce", ring: "#a855f7" },
  blue: { primary: "#3b82f6", secondary: "#3b82f6", secondaryContainer: "#1d4ed8", ring: "#3b82f6" },
  green: { primary: "#22c55e", secondary: "#22c55e", secondaryContainer: "#15803d", ring: "#22c55e" },
  pink: { primary: "#ec4899", secondary: "#ec4899", secondaryContainer: "#be185d", ring: "#ec4899" },
} as const;

const ACCENT_CSS_LIGHT = {
  orange: { primary: "#ea580c", secondary: "#ea580c", secondaryContainer: "#fed7aa", ring: "#ea580c" },
  purple: { primary: "#9333ea", secondary: "#9333ea", secondaryContainer: "#e9d5ff", ring: "#9333ea" },
  blue: { primary: "#2563eb", secondary: "#2563eb", secondaryContainer: "#bfdbfe", ring: "#2563eb" },
  green: { primary: "#16a34a", secondary: "#16a34a", secondaryContainer: "#bbf7d0", ring: "#16a34a" },
  pink: { primary: "#db2777", secondary: "#db2777", secondaryContainer: "#fbcfe8", ring: "#db2777" },
} as const;

const STORAGE_KEY = "firelabs-appearance";

const loadSaved = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved) as Appearance;
  } catch {
    console.warn("Invalid appearance data in localStorage");
  }
  return mockAppearance;
};

interface Appearance {
  theme: ThemeMode;
  accentColor: AccentColor;
  sidebarCollapsed: boolean;
}

export const AppearanceSection: React.FC = () => {
  const [appearance, setAppearance] = useState<Appearance>(loadSaved);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appearance));
    localStorage.setItem("firelabs-sidebar", String(appearance.sidebarCollapsed));
    const root = document.documentElement;
    const isLight = appearance.theme === "light";
    root.classList.toggle("light", isLight);
    root.classList.toggle("dark", !isLight);

    const vars = isLight ? ACCENT_CSS_LIGHT[appearance.accentColor] : ACCENT_CSS[appearance.accentColor];
    root.style.setProperty("--color-primary", vars.primary);
    root.style.setProperty("--color-secondary", vars.secondary);
    root.style.setProperty("--color-secondary-container", vars.secondaryContainer);
    root.style.setProperty("--ring", vars.ring);
  }, [appearance]);

  const update = (partial: Partial<Appearance>) => {
    setAppearance((prev) => ({ ...prev, ...partial }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 p-5 md:p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
          <Palette className="w-5 h-5 text-secondary" />
        </div>
        <h2 className="text-headline-md font-headline-md text-on-surface">
          Apariencia
        </h2>
      </div>

      <div className="mb-6">
        <p className="text-body-sm text-on-surface-variant mb-3">Tema</p>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => update({ theme: "dark" })}
            className={`rounded-xl p-4 text-center text-body-sm font-medium transition-all border-2 ${
              appearance.theme === "dark"
                ? "border-secondary bg-surface-container ring-2 ring-secondary/30"
                : "border-outline-variant/30 bg-surface-container-lowest hover:border-outline-variant/60"
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-surface-container-high mx-auto mb-2 flex items-center justify-center">
              <span className="material-symbols-outlined text-sm text-on-surface">dark_mode</span>
            </div>
            <p className={`font-medium ${appearance.theme === "dark" ? "text-on-surface" : "text-on-surface-variant"}`}>
              Oscuro
            </p>
          </button>
          <button
            onClick={() => update({ theme: "light" })}
            className={`rounded-xl p-4 text-center text-body-sm font-medium transition-all border-2 ${
              appearance.theme === "light"
                ? "border-secondary bg-surface-container ring-2 ring-secondary/30"
                : "border-outline-variant/30 bg-surface-container-lowest hover:border-outline-variant/60"
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-amber-100 mx-auto mb-2 flex items-center justify-center">
              <span className="material-symbols-outlined text-sm text-amber-700">light_mode</span>
            </div>
            <p className={`font-medium ${appearance.theme === "light" ? "text-on-surface" : "text-on-surface-variant"}`}>
              Claro
            </p>
          </button>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-body-sm text-on-surface-variant mb-3">
          Color de Acento
        </p>
        <div className="flex gap-3">
          {ACCENT_COLORS.map((accent) => (
            <button
              key={accent.key}
              onClick={() => update({ accentColor: accent.key })}
              className={`w-8 h-8 rounded-full cursor-pointer transition-all ${
                appearance.accentColor === accent.key
                  ? "ring-2 ring-on-surface ring-offset-2 ring-offset-surface-container-lowest"
                  : "opacity-60 hover:opacity-100"
              }`}
              style={{ backgroundColor: appearance.theme === "light" ? accent.dark : accent.color }}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-body-sm font-medium text-on-surface">
              Sidebar colapsada
            </p>
            <p className="text-body-xs text-on-surface-variant mt-0.5">
              Mantén la navegación contraída por defecto
            </p>
          </div>
          <button
            onClick={() => update({ sidebarCollapsed: !appearance.sidebarCollapsed })}
            role="switch"
            aria-checked={appearance.sidebarCollapsed}
            className={`relative w-11 h-6 rounded-full shrink-0 cursor-pointer transition-colors ${
              appearance.sidebarCollapsed ? "bg-secondary" : "bg-outline-variant/50"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ease-in-out ${
                appearance.sidebarCollapsed ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
