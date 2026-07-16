import { ProfileSection } from "./components/ProfileSection";
import { SecuritySection } from "./components/SecuritySection";
import { PreferencesSection } from "./components/PreferencesSection";
import { AppearanceSection } from "./components/AppearanceSection";

export const SettingsPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-8rem)]">
      <div className="mb-8">
        <h1 className="text-headline-lg md:text-display-lg font-display-lg bg-gradient-to-r from-[#f97316] via-[#fb923c] to-[#fbbf24] bg-clip-text text-transparent">
          Ajustes
        </h1>
        <p className="text-body-lg text-on-surface-variant mt-1">
          Gestiona tu perfil, seguridad y preferencias
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <ProfileSection />
        <SecuritySection />
        <PreferencesSection />
        <AppearanceSection />
      </div>
    </div>
  );
};
