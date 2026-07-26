export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  phone: string;
  company: string;
  role: string;
}

export interface SecurityInfo {
  passwordLastChanged: string;
  twoFactorEnabled: boolean;
  activeSessions: number;
  lastLogin: string;
}

export interface UserPreferences {
  language: string;
  timezone: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
}

export type ThemeMode = "dark" | "light";
export type AccentColor = "orange" | "purple" | "blue" | "green" | "pink";

export interface Appearance {
  theme: ThemeMode;
  accentColor: AccentColor;
  sidebarCollapsed: boolean;
}
