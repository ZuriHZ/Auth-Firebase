import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Clock, Zap, Database, Shield, Calendar } from "lucide-react";
import type { CloudFunction, FunctionStatus, FunctionTrigger } from "../types";

const statusConfig: Record<FunctionStatus, { dot: string; bg: string }> = {
  online: { dot: "bg-success", bg: "bg-success/10 text-success" },
  offline: { dot: "bg-on-surface", bg: "bg-on-surface/10 text-on-surface-variant" },
  error: { dot: "bg-error", bg: "bg-error/10 text-error" },
};

const triggerIcon: Record<FunctionTrigger, typeof Zap> = {
  HTTP: Zap,
  Database: Database,
  Auth: Shield,
  Schedule: Calendar,
};

const triggerLabels: Record<FunctionTrigger, string> = {
  HTTP: "HTTP",
  Database: "DB Trigger",
  Auth: "Auth Event",
  Schedule: "Cron",
};

const logLevelDot: Record<string, string> = {
  info: "bg-success",
  warn: "bg-warning",
  error: "bg-error",
};

interface FunctionCardProps {
  fn: CloudFunction;
  index: number;
}

export const FunctionCard: React.FC<FunctionCardProps> = ({ fn, index }) => {
  const [expanded, setExpanded] = useState(false);
  const status = statusConfig[fn.status];
  const TriggerIcon = triggerIcon[fn.trigger];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 p-5 md:p-6"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-headline-sm font-display-md text-on-surface truncate">
                {fn.name}
              </h3>
              <span className="bg-secondary/10 text-secondary text-body-xs px-2 py-0.5 rounded-full shrink-0">
                {fn.runtime}
              </span>
              <span className={`text-body-xs px-2 py-0.5 rounded-full font-medium shrink-0 flex items-center gap-1.5 ${status.bg}`}>
                <span className={`w-2 h-2 rounded-full inline-block ${status.dot}`} />
                {fn.status === "online" ? "Activo" : fn.status === "offline" ? "Inactivo" : "Error"}
              </span>
            </div>
            <p className="text-body-sm text-on-surface-variant mb-3">
              {fn.description}
            </p>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-secondary/10 flex items-center justify-center">
                <TriggerIcon className="w-3.5 h-3.5 text-secondary" />
              </div>
              <span className="text-body-xs text-on-surface-variant">{triggerLabels[fn.trigger]}</span>
            </div>
          </div>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="mt-1 shrink-0"
          >
            <ChevronDown className="w-5 h-5 text-on-surface-variant" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-4 mt-4 border-t border-outline-variant/20">
              <div className="flex items-center gap-6 mb-4 text-body-sm text-on-surface-variant">
                {fn.lastRun && (
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>Última ejecución: {fn.lastRun}</span>
                  </div>
                )}
                {fn.lastDuration && (
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4" />
                    <span>Duración: {fn.lastDuration}</span>
                  </div>
                )}
              </div>

              {fn.logs.length > 0 && (
                <div>
                  <p className="text-body-xs font-medium text-on-surface-variant mb-2 uppercase tracking-wider">
                    Logs ({fn.logs.length})
                  </p>
                  <div className="space-y-1">
                    {fn.logs.map((log) => (
                      <div key={log.id} className="flex items-start gap-2 text-body-xs">
                        <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${logLevelDot[log.level]}`} />
                        <span className="text-on-surface-variant/60 shrink-0">{log.timestamp}</span>
                        <span className={log.level === "error" ? "text-error" : log.level === "warn" ? "text-warning" : "text-on-surface"}>
                          {log.message}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
