import { useState } from "react";
import { motion } from "framer-motion";
import { Palette } from "lucide-react";
import type { ThemeMode, AccentColor } from "../types";
import { mockAppearance } from "../data/mock";

const ACCENT_COLORS: { key: AccentColor; color: string }[] = [
  { key: "orange", color: "#f97316" },
  { key: "purple", color: "#a855f7" },
  { key: "blue", color: "#3b82f6" },
  { key: "green", color: "#22c55e" },
  { key: "pink", color: "#ec4899" },
];

export const AppearanceSection: React.FC = () => {
  const [theme, setTheme] = useState<ThemeMode>(mockAppearance.theme);
  const [accentColor, setAccentColor] = useState<AccentColor>(
    mockAppearance.accentColor
  );
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    mockAppearance.sidebarCollapsed
  );

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
            onClick={() => setTheme("dark")}
            className={`bg-gray-900 text-white rounded-xl p-4 text-center text-body-sm font-medium transition-all ${
              theme === "dark" ? "ring-2 ring-secondary" : ""
            }`}
          >
            <div className="w-6 h-6 rounded bg-white/20 mx-auto mb-2" />
            <div className="w-16 h-1.5 rounded bg-white/20 mx-auto mb-1" />
            <div className="w-12 h-1.5 rounded bg-white/20 mx-auto" />
            <p className="mt-2">Oscuro</p>
          </button>
          <button
            onClick={() => setTheme("light")}
            className={`bg-white text-gray-900 rounded-xl p-4 border border-outline-variant/30 text-center text-body-sm font-medium transition-all ${
              theme === "light" ? "ring-2 ring-secondary" : ""
            }`}
          >
            <div className="w-6 h-6 rounded bg-gray-200 mx-auto mb-2" />
            <div className="w-16 h-1.5 rounded bg-gray-200 mx-auto mb-1" />
            <div className="w-12 h-1.5 rounded bg-gray-200 mx-auto" />
            <p className="mt-2">Claro</p>
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
              onClick={() => setAccentColor(accent.key)}
              className={`w-8 h-8 rounded-full cursor-pointer transition-all ${
                accentColor === accent.key
                  ? "ring-2 ring-white ring-offset-2 ring-offset-surface-container-lowest"
                  : ""
              }`}
              style={{ backgroundColor: accent.color }}
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
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`w-10 h-6 rounded-full relative cursor-pointer shrink-0 transition-colors ${
              sidebarCollapsed ? "bg-secondary" : "bg-outline-variant/30"
            }`}
          >
            <span
              className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                sidebarCollapsed ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
