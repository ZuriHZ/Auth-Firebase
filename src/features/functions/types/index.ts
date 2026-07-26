export type FunctionStatus = "online" | "offline" | "error";
export type FunctionTrigger = "HTTP" | "Database" | "Auth" | "Schedule";

export interface FunctionLog {
  id: string;
  timestamp: string;
  level: "info" | "warn" | "error";
  message: string;
}

export interface CloudFunction {
  id: string;
  name: string;
  description: string;
  runtime: string;
  status: FunctionStatus;
  trigger: FunctionTrigger;
  lastRun: string | null;
  lastDuration: string | null;
  logs: FunctionLog[];
}
