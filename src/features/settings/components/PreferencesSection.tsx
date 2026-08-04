import { useState } from "react";
import { motion } from "framer-motion";
import { Settings } from "lucide-react";
import { mockPreferences } from "../data/mock";

const LANGUAGES = [
  { value: "es", label: "Español" },
  { value: "en", label: "Inglés" },
  { value: "pt", label: "Portugués" },
];

const TIMEZONES = [
  { value: "America/Mexico_City", label: "Ciudad de México (UTC-6)" },
  { value: "America/Argentina/Buenos_Aires", label: "Buenos Aires (UTC-3)" },
  { value: "America/Santiago", label: "Santiago (UTC-4)" },
  { value: "America/Bogota", label: "Bogotá (UTC-5)" },
  { value: "Europe/Madrid", label: "Madrid (UTC+2)" },
];

export const PreferencesSection: React.FC = () => {
  const [language, setLanguage] = useState(mockPreferences.language);
  const [timezone, setTimezone] = useState(mockPreferences.timezone);
  const [emailNotif, setEmailNotif] = useState(mockPreferences.emailNotifications);
  const [pushNotif, setPushNotif] = useState(mockPreferences.pushNotifications);
  const [marketing, setMarketing] = useState(mockPreferences.marketingEmails);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 p-5 md:p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
          <Settings className="w-5 h-5 text-secondary" />
        </div>
        <h2 className="text-headline-md font-headline-md text-on-surface">
          Preferencias
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-body-sm text-on-surface-variant mb-1.5">
            Idioma
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl w-full px-4 py-2.5 text-body-sm text-on-surface appearance-none focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            {LANGUAGES.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-body-sm text-on-surface-variant mb-1.5">
            Zona Horaria
          </label>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl w-full px-4 py-2.5 text-body-sm text-on-surface appearance-none focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            {TIMEZONES.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <ToggleRow
          label="Notificaciones por Email"
          description="Recibe notificaciones importantes por correo"
          checked={emailNotif}
          onChange={setEmailNotif}
        />
        <ToggleRow
          label="Notificaciones Push"
          description="Notificaciones en tiempo real en el navegador"
          checked={pushNotif}
          onChange={setPushNotif}
        />
        <ToggleRow
          label="Correos de Marketing"
          description="Novedades, promociones y contenido exclusivo"
          checked={marketing}
          onChange={setMarketing}
        />
      </div>
    </motion.div>
  );
};

interface ToggleRowProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

const ToggleRow: React.FC<ToggleRowProps> = ({
  label,
  description,
  checked,
  onChange,
}) => (
  <div className="flex items-center justify-between py-2">
    <div>
      <p className="text-body-sm font-medium text-on-surface">{label}</p>
      <p className="text-body-xs text-on-surface-variant mt-0.5">{description}</p>
    </div>
    <button
      onClick={() => onChange(!checked)}
      role="switch"
      aria-checked={checked}
      className={`relative w-11 h-6 rounded-full shrink-0 cursor-pointer transition-colors ${
        checked ? "bg-secondary" : "bg-outline-variant/50"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ease-in-out ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  </div>
);
