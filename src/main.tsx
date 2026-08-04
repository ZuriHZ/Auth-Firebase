import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

const saved = localStorage.getItem("firelabs-appearance");
if (saved) {
    const parsed = JSON.parse(saved);
    const isLight = parsed.theme === "light";
    document.documentElement.classList.toggle("dark", !isLight);
    document.documentElement.classList.toggle("light", isLight);
    const accentMap: Record<string, Record<string, string>> = {
        orange: { primary: "#ff6b1a", secondary: "#fb923c", secondaryContainer: "#c2410c", ring: "#fb923c" },
        purple: { primary: "#a855f7", secondary: "#a855f7", secondaryContainer: "#7e22ce", ring: "#a855f7" },
        blue: { primary: "#3b82f6", secondary: "#3b82f6", secondaryContainer: "#1d4ed8", ring: "#3b82f6" },
        green: { primary: "#22c55e", secondary: "#22c55e", secondaryContainer: "#15803d", ring: "#22c55e" },
        pink: { primary: "#ec4899", secondary: "#ec4899", secondaryContainer: "#be185d", ring: "#ec4899" },
    };
    const accentLightMap: Record<string, Record<string, string>> = {
        orange: { primary: "#ea580c", secondary: "#ea580c", secondaryContainer: "#fed7aa", ring: "#ea580c" },
        purple: { primary: "#9333ea", secondary: "#9333ea", secondaryContainer: "#e9d5ff", ring: "#9333ea" },
        blue: { primary: "#2563eb", secondary: "#2563eb", secondaryContainer: "#bfdbfe", ring: "#2563eb" },
        green: { primary: "#16a34a", secondary: "#16a34a", secondaryContainer: "#bbf7d0", ring: "#16a34a" },
        pink: { primary: "#db2777", secondary: "#db2777", secondaryContainer: "#fbcfe8", ring: "#db2777" },
    };
    const vars = isLight ? accentLightMap[parsed.accentColor] : accentMap[parsed.accentColor];
    if (vars) {
        const root = document.documentElement;
        root.style.setProperty("--color-primary", vars.primary);
        root.style.setProperty("--color-secondary", vars.secondary);
        root.style.setProperty("--color-secondary-container", vars.secondaryContainer);
        root.style.setProperty("--ring", vars.ring);
    }
} else {
    document.documentElement.classList.add("dark");
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>,
);
