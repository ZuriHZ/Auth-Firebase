import { motion } from "framer-motion";
import { Link } from "lucide-react";
import type { ProviderInfo } from "../types";

interface ProvidersCardProps {
  providers: ProviderInfo[];
  delay?: number;
}

const providerIcons: Record<string, string> = {
  google: "G",
  mail: "✉",
  github: "GH",
};

const providerColors: Record<string, string> = {
  google: "#4285F4",
  mail: "#fb923c",
  github: "#6e5494",
};

export const ProvidersCard: React.FC<ProvidersCardProps> = ({ providers, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 p-5 md:p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
          <Link className="w-5 h-5 text-secondary" />
        </div>
        <h4 className="text-headline-md font-headline-md text-on-surface">
          Proveedores
        </h4>
      </div>

      <div className="space-y-3">
        {providers.map((provider) => (
          <div
            key={provider.id}
            className="flex items-center gap-4 p-4 bg-surface-container-low rounded-xl border border-outline-variant/20"
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-body-sm font-bold shrink-0"
              style={{
                backgroundColor: `${providerColors[provider.icon] || "#fb923c"}1A`,
                color: providerColors[provider.icon] || "#fb923c",
              }}
            >
              {providerIcons[provider.icon] || "?"}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-body-sm font-semibold text-on-surface">
                {provider.name}
              </p>
            </div>

            <span
              className={`text-body-xs px-2.5 py-1 rounded-full font-medium shrink-0 ${
                provider.connected
                  ? "bg-success/10 text-success"
                  : "bg-on-surface/10 text-on-surface-variant"
              }`}
            >
              {provider.connected ? "Conectado" : "No conectado"}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
