export interface SessionInfo {
  uid: string;
  email: string;
  displayName: string;
  rol: string;
  emailVerified: boolean;
  createdAt: string;
  lastSignIn: string;
  isDemo: boolean;
}

export interface AuthToken {
  type: string;
  issuer: string;
  issuedAt: string;
  expiresAt: string;
  isExpired: boolean;
  raw: string;
}

export interface UserClaims {
  rol: string;
  emailVerified: boolean;
  provider: string;
  mfaEnabled: boolean;
  customClaims: { key: string; value: string }[];
}

export interface ProviderInfo {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  lastUsed: string;
}
