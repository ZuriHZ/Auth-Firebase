import type { UserProfile, SecurityInfo, UserPreferences, Appearance } from "../types";

export const mockProfile: UserProfile = {
  name: "Martín Reyes",
  email: "martin@firelabs.dev",
  avatar: "",
  phone: "+52 55 1234 5678",
  company: "FireLabs",
  role: "Desarrollador Full Stack",
};

export const mockSecurity: SecurityInfo = {
  passwordLastChanged: "15 junio 2026",
  twoFactorEnabled: false,
  activeSessions: 3,
  lastLogin: "hace 2 horas",
};

export const mockPreferences: UserPreferences = {
  language: "es",
  timezone: "America/Mexico_City",
  emailNotifications: true,
  pushNotifications: true,
  marketingEmails: false,
};

export const mockAppearance: Appearance = {
  theme: "dark",
  accentColor: "orange",
  sidebarCollapsed: false,
};
