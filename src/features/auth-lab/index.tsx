import { SessionInfoCard } from "./components/SessionInfoCard";
import { TokenCard } from "./components/TokenCard";
import { ClaimsCard } from "./components/ClaimsCard";
import { ProvidersCard } from "./components/ProvidersCard";
import { mockSession, mockToken, mockClaims, mockProviders } from "./data/mock";

export const AuthLabPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-8rem)]">
      <div className="mb-8">
        <h1 className="text-headline-lg md:text-display-lg font-display-lg bg-gradient-to-r from-[#f97316] via-[#fb923c] to-[#fbbf24] bg-clip-text text-transparent">
          Auth Lab
        </h1>
        <p className="text-body-lg text-on-surface-variant mt-1">
          Explora y debuguea el estado de autenticación de Firebase
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SessionInfoCard session={mockSession} delay={0.1} />
        <TokenCard token={mockToken} delay={0.15} />
        <ClaimsCard claims={mockClaims} delay={0.2} />
        <ProvidersCard providers={mockProviders} delay={0.25} />
      </div>
    </div>
  );
};
