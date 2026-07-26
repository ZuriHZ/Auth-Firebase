import { useState } from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import type { UserProfile as UserProfileType } from "../types";
import { mockProfile } from "../data/mock";

export const ProfileSection: React.FC = () => {
  const [profile, setProfile] = useState<UserProfileType>(mockProfile);

  const handleChange = (field: keyof UserProfileType) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProfile((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0 }}
      className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 p-5 md:p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
          <User className="w-5 h-5 text-secondary" />
        </div>
        <h2 className="text-headline-md font-headline-md text-on-surface">
          Perfil
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field
          label="Nombre"
          value={profile.name}
          onChange={handleChange("name")}
          editable
        />
        <div>
          <label className="block text-body-sm text-on-surface-variant mb-1.5">
            Email
          </label>
          <div className="flex items-center gap-2">
            <input
              type="email"
              value={profile.email}
              readOnly
              className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl w-full px-4 py-2.5 text-body-sm text-on-surface/60 cursor-not-allowed"
            />
            <span className="text-body-xs px-2 py-0.5 rounded-full bg-success/10 text-success font-medium whitespace-nowrap">
              Verificado
            </span>
          </div>
        </div>
        <Field
          label="Teléfono"
          value={profile.phone}
          onChange={handleChange("phone")}
          editable
        />
        <Field
          label="Compañía"
          value={profile.company}
          onChange={handleChange("company")}
          editable
        />
        <Field
          label="Rol"
          value={profile.role}
          onChange={handleChange("role")}
          editable
        />
      </div>

      <button
        onClick={() => {
          setProfile(profile);
          const btn = document.activeElement as HTMLButtonElement;
          btn.textContent = "✓ Guardado";
          setTimeout(() => { btn.textContent = "Guardar Cambios"; }, 2000);
        }}
        className="mt-6 bg-secondary text-on-secondary rounded-xl px-4 py-2.5 text-body-sm font-medium hover:opacity-90 active:scale-[0.97] transition-all"
      >
        Guardar Cambios
      </button>
    </motion.div>
  );
};

interface FieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editable?: boolean;
}

const Field: React.FC<FieldProps> = ({ label, value, onChange, editable }) => (
  <div>
    <label className="block text-body-sm text-on-surface-variant mb-1.5">
      {label}
    </label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      readOnly={!editable}
      className={`bg-surface-container-lowest border border-outline-variant/30 rounded-xl w-full px-4 py-2.5 text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary ${
        !editable ? "cursor-not-allowed text-on-surface/60" : ""
      }`}
    />
  </div>
);
