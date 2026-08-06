import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../firebase/firebase";

const DEMO_ACCOUNTS = [
  {
    id: "admin",
    label: "Admin Demo",
    email: "admin@firelabs.dev",
    password: "Firelabs-Admin-2026",
    icon: "👑",
  },
  {
    id: "usuario",
    label: "Usuario Demo",
    email: "usuario@firelabs.dev",
    password: "Firelabs-Demo-2026",
    icon: "👤",
  },
] as const;

type DemoAccountId = (typeof DEMO_ACCOUNTS)[number]["id"];

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState<DemoAccountId | null>(null);

  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const getErrorMessage = (error: unknown) => {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    const code = (error as { code?: string }).code;
    if (code === "auth/invalid-credential") {
      return "Email o contraseña incorrectos";
    }
    if (code === "auth/user-not-found") {
      return "Usuario no encontrado";
    }
    if (code === "auth/wrong-password") {
      return "Contraseña incorrecta";
    }
    if (code === "auth/too-many-requests") {
      return "Demasiados intentos. Intenta más tarde";
    }
    return "Error al iniciar sesión: " + msg;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(formData.email, formData.password);
      navigate("/dashboard");
    } catch (error: unknown) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError("");
      setLoading(true);
      await loginWithGoogle();
      navigate("/dashboard");
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Error desconocido";
      setError("Error al iniciar sesión con Google: " + msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (accountId: DemoAccountId) => {
    const account = DEMO_ACCOUNTS.find((a) => a.id === accountId);
    if (!account) return;
    try {
      setError("");
      setDemoLoading(accountId);
      await signInWithEmailAndPassword(auth, account.email, account.password);
      navigate("/dashboard");
    } catch (error: unknown) {
      setError(getErrorMessage(error));
    } finally {
      setDemoLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 hero-pattern">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-1.5 mb-2">
            <span className="material-symbols-outlined text-secondary text-3xl">local_fire_department</span>
            <span className="text-title-lg font-headline-lg tracking-tight text-on-surface fire-text">FireLabs</span>
          </div>
          <h2 className="text-title-md font-headline-md text-on-surface">Iniciar sesión</h2>
          <p className="text-body-xs text-on-surface-variant mt-0.5">Accede a tu cuenta para continuar</p>
        </div>

        {/* Login Form */}
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/30 shadow-level-1">
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
                    value={formData.email} onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2 bg-surface-container-low border border-outline-variant/50 rounded-lg text-body-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-body-xs font-label-md text-on-surface-variant mb-1">Contraseña</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-lg">lock</span>
                  <input
                    id="password" name="password" type="password" required
                    value={formData.password} onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2 bg-surface-container-low border border-outline-variant/50 rounded-lg text-body-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 mb-3">
              <Link to="/reset-password" className="text-body-xs text-secondary hover:underline">¿Olvidaste tu contraseña?</Link>
            </div>

            <button type="submit" disabled={loading}
              className="w-full flex justify-center py-2 px-3 bg-secondary text-on-secondary rounded-lg text-body-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Iniciando sesión..." : "Iniciar sesión"}
            </button>

            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-outline-variant/30" /></div>
              <div className="relative flex justify-center text-body-xs">
                <span className="px-3 bg-surface-container-lowest text-on-surface-variant">o continúa con</span>
              </div>
            </div>

            <button type="button" onClick={handleGoogleSignIn} disabled={loading}
              className="w-full flex items-center justify-center py-2 px-3 border border-outline-variant/50 bg-surface-container-lowest text-on-surface rounded-lg text-body-sm font-medium hover:bg-surface-container-low active:scale-[0.98] transition-all disabled:opacity-50"
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
          </form>

          <div className="text-center mt-4">
            <Link to="/register" className="text-body-xs text-secondary hover:underline">¿No tienes cuenta? Regístrate</Link>
          </div>
        </div>

        {/* Modo Demo */}
        <div className="mt-4 bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/30 shadow-level-1">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="material-symbols-outlined text-secondary text-lg">science</span>
            <h3 className="text-title-md font-headline-md text-on-surface">Modo Demo</h3>
          </div>
          <p className="text-body-xs text-on-surface-variant mb-3">
            Probá FireLabs sin registrarte con una cuenta de prueba.
          </p>
          <div className="space-y-2">
            {DEMO_ACCOUNTS.map((account) => (
              <button
                key={account.id}
                type="button"
                onClick={() => handleDemoLogin(account.id)}
                disabled={demoLoading !== null || loading}
                className="w-full flex items-center justify-between gap-2 py-2 px-3 border border-outline-variant/50 bg-surface-container-lowest text-on-surface rounded-lg text-body-sm font-medium hover:bg-surface-container-low active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center gap-2">
                  <span aria-hidden="true">{account.icon}</span>
                  {account.label}
                </span>
                <span className="text-body-xs text-on-surface-variant truncate">
                  {demoLoading === account.id ? "Ingresando..." : account.email}
                </span>
              </button>
            ))}
          </div>
          <p className="text-body-xs text-on-surface-variant mt-3">
            Credenciales visibles a propósito: son cuentas de demostración, no secretos.
          </p>
        </div>
      </div>
    </div>
  );
};
