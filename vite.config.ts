import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        port: 5173,
        open: true,
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    if (id.includes("node_modules")) {
                        if (
                            id.includes("react") ||
                            id.includes("react-dom") ||
                            id.includes("react-router")
                        ) {
                            return "react-vendor";
                        }
                        if (id.includes("firebase")) {
                            return "firebase";
                        }
                        return "vendor";
                    }
                },
            },
        },
        chunkSizeWarningLimit: 1000,
    },
});
