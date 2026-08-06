// ------------------------------------------------
// RESET PASSWORD PAGE (Restablecer Contraseña)
// ------------------------------------------------
//
// Función: permitir que un usuario sin sesión solicite
// un email de restablecimiento de contraseña.
//
// FLUJO:
//   1. El usuario ingresa su email y envía el formulario
//   2. Se llama a resetPassword (sendPasswordResetEmail de
//      Firebase, expuesto por AuthContext)
//   3. Se muestra un mensaje de éxito GENÉRICO en todos los
//      casos (anti-enumeración): nunca se revela si un email
//      está o no registrado en la app.

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const { resetPassword } = useAuth();

  const SUCCESS_MESSAGE =
    "Si el email está registrado, vas a recibir un link para restablecer tu contraseña.";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setError("");
      setSuccess("");
      setLoading(true);
      await resetPassword(email);
      setSuccess(SUCCESS_MESSAGE);
    } catch (error: unknown) {
      const code = (error as { code?: string }).code;
      if (code === "auth/user-not-found" || code === "auth/invalid-email") {
        // Anti-enumeración: mismo mensaje de éxito aunque el
        // email no exista o sea inválido. No revela nada.
        setSuccess(SUCCESS_MESSAGE);
      } else if (code === "auth/too-many-requests") {
        setError("Demasiados intentos. Intenta más tarde");
      } else {
        setError("No se pudo enviar el email. Intenta de nuevo");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 hero-pattern">
      <div className="w-full max-w-sm">
        <div className="text-center mb-3">
          <div className="flex items-center justify-center gap-1.5 mb-2">
            <span className="material-symbols-outlined text-secondary text-3xl">local_fire_department</span>
            <span className="text-title-lg font-headline-lg tracking-tight text-on-surface fire-text">FireLabs</span>
          </div>
          <h2 className="text-title-md font-headline-md text-on-surface">Restablecer contraseña</h2>
          <p className="text-body-xs text-on-surface-variant mt-0.5">
            Ingresá tu email y te enviamos un link para recuperar el acceso
          </p>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/30 shadow-level-1">
          {success && (
            <div className="mb-3 p-2.5 rounded-lg bg-secondary/10 border border-secondary/20 text-secondary text-body-xs">{success}</div>
          )}
          {error && (
            <div className="mb-3 p-2.5 rounded-lg bg-error/10 border border-error/20 text-error text-body-xs">{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-3">
              <div>
                <label htmlFor="email" className="block text-body-xs font-label-md text-on-surface-variant mb-1">Email</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-lg">mail</span>
                  <input
                    id="email" name="email" type="email" required
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-surface-container-low border border-outline-variant/50 rounded-lg text-body-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full flex justify-center items-center gap-1.5 py-2 px-3 bg-secondary text-on-secondary rounded-lg text-body-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              <span className="material-symbols-outlined text-lg">lock_reset</span>
              {loading ? "Enviando..." : "Enviar link de recuperación"}
            </button>
          </form>

          <div className="text-center mt-4">
            <Link to="/login" className="text-body-xs text-secondary hover:underline">Volver a iniciar sesión</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
