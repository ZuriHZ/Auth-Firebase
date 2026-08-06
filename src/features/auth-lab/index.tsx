import { useEffect, useState } from "react";
import { SessionInfoCard } from "./components/SessionInfoCard";
import { TokenCard } from "./components/TokenCard";
import { ClaimsCard } from "./components/ClaimsCard";
import { ProvidersCard } from "./components/ProvidersCard";
import { useAuth } from "../../context/AuthContext";
import type { IdTokenResult } from "firebase/auth";
import type {
  SessionInfo,
  AuthToken,
  UserClaims,
  ProviderInfo,
} from "./types";

// Claims reservadas por Firebase Auth (no son custom claims).
// Todo lo que esté fuera de este set en el ID token es un custom claim real.
const RESERVED_CLAIMS = new Set([
  "iss",
  "aud",
  "auth_time",
  "user_id",
  "sub",
  "iat",
  "exp",
  "email",
  "email_verified",
  "phone_number",
  "name",
  "picture",
  "firebase",
  "uid",
  "azp",
  "nonce",
  "at_hash",
  "c_hash",
  "nbf",
  "jti",
  "sid",
]);

const providerName = (id: string) => {
  if (id === "google.com") return "Google";
  if (id === "password") return "Email / Password";
  return id;
};

const providerIcon = (id: string) => {
  if (id === "google.com") return "google";
  if (id === "password") return "mail";
  return id;
};

const isTokenExpired = (res: IdTokenResult) =>
  new Date(res.expirationTime).getTime() < Date.now();

export const AuthLabPage: React.FC = () => {
  const { user, appUser, userRole } = useAuth();
  const [idTokenResult, setIdTokenResult] = useState<IdTokenResult | null>(null);

  useEffect(() => {
    let mounted = true;
    if (!user) {
      setIdTokenResult(null);
      return;
    }
    user
      .getIdTokenResult()
      .then((res) => {
        if (mounted) setIdTokenResult(res);
      })
      .catch((error) => {
        console.error("Error al obtener el ID token:", error);
        if (mounted) setIdTokenResult(null);
      });
    return () => {
      mounted = false;
    };
  }, [user]);

  if (!user) {
    return (
      <div className="text-body-sm text-on-surface-variant">
        No hay sesión activa
      </div>
    );
  }

  const session: SessionInfo = {
    uid: user.uid,
    email: user.email ?? "—",
    displayName: user.displayName ?? "—",
    rol: userRole ?? "usuario",
    emailVerified: user.emailVerified,
    createdAt: user.metadata.creationTime ?? "",
    lastSignIn: user.metadata.lastSignInTime ?? "",
    isDemo: appUser?.demo ?? false,
  };

  const token: AuthToken | null = idTokenResult
    ? {
        type: "Bearer",
        issuer: String(idTokenResult.claims.iss ?? "—"),
        issuedAt: idTokenResult.issuedAtTime,
        expiresAt: idTokenResult.expirationTime,
        isExpired: isTokenExpired(idTokenResult),
        raw: idTokenResult.token,
      }
    : null;

  const claims: UserClaims = {
    rol: userRole ?? "usuario",
    emailVerified: user.emailVerified,
    provider: idTokenResult?.signInProvider ?? "—",
    mfaEnabled: false,
    customClaims: idTokenResult
      ? Object.entries(idTokenResult.claims)
          .filter(([key]) => !RESERVED_CLAIMS.has(key))
          .map(([key, value]) => ({ key, value: String(value) }))
      : [],
  };

  const providers: ProviderInfo[] = user.providerData.map((p) => ({
    id: p.providerId,
    name: providerName(p.providerId),
    icon: providerIcon(p.providerId),
    connected: true,
  }));

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      <div className="mb-8">
        <h1 className="text-headline-lg md:text-display-lg font-display-lg fire-text">
          Auth Lab
        </h1>
        <p className="text-body-lg text-on-surface-variant mt-1">
          Explora y debuguea el estado de autenticación de Firebase
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SessionInfoCard session={session} delay={0.1} />
        <TokenCard token={token} delay={0.15} />
        <ClaimsCard claims={claims} delay={0.2} />
        <ProvidersCard providers={providers} delay={0.25} />
      </div>
    </div>
  );
};
