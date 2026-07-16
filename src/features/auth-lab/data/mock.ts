import type { SessionInfo, AuthToken, UserClaims, ProviderInfo } from "../types";

export const mockSession: SessionInfo = {
  uid: "a1B2c3D4e5F6g7H8i9J0kLmN",
  email: "usuario@firelabs.dev",
  displayName: "Usuario Demo",
  rol: "admin",
  emailVerified: true,
  createdAt: "2026-01-15T10:30:00Z",
  lastSignIn: "2026-07-16T08:15:00Z",
  isDemo: true,
};

export const mockToken: AuthToken = {
  type: "Bearer",
  issuer: "firebase-auth",
  issuedAt: "2026-07-16T07:45:00Z",
  expiresAt: "2026-07-16T10:45:00Z",
  isExpired: false,
  raw: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJmaXJlYmFzZS1hdXRoIiwic3ViIjoiYTFCMmMzRDRlNUY2ZzdIOGk5SjBrTG1OIiwiYXVkIjoiZmlyZWxhYnMtZGV2IiwiYWRtaW4iOnRydWUsImlhdCI6MTcyMTEzMjMwMCwiZXhwIjoxNzIxMTQyMzAwfQ.exampleSignature",
};

export const mockClaims: UserClaims = {
  rol: "admin",
  emailVerified: true,
  provider: "google.com",
  mfaEnabled: false,
  customClaims: [
    { key: "department", value: "engineering" },
    { key: "region", value: "us-east" },
    { key: "beta_access", value: "true" },
  ],
};

export const mockProviders: ProviderInfo[] = [
  {
    id: "google.com",
    name: "Google",
    icon: "google",
    connected: true,
    lastUsed: "2026-07-16T08:15:00Z",
  },
  {
    id: "password",
    name: "Email / Password",
    icon: "mail",
    connected: true,
    lastUsed: "2026-03-10T14:22:00Z",
  },
  {
    id: "github.com",
    name: "GitHub",
    icon: "github",
    connected: false,
    lastUsed: "",
  },
];
