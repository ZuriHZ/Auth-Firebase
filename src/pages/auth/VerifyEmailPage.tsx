// src/components/VerifyEmail.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const VerifyEmail = () => {
  const { user, logout, resendVerificationEmail } = useAuth();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  // Verificar si el email ya está verificado
  useEffect(() => {
    const interval = setInterval(async () => {
      if (user) {
        await user.reload();
        if (user.emailVerified) {
          navigate('/dashboard');
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [user, navigate]);

  // Countdown para reenviar email
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResendEmail = async () => {
    if (countdown > 0) return;

    try {
      setLoading(true);
      setError('');
      await resendVerificationEmail();
      setMessage('Email de verificación enviado. Revisa tu bandeja de entrada.');
      setCountdown(60);
    } catch (error: unknown) {
      console.error(error);
      const msg = error instanceof Error ? error.message : "Error desconocido";
      const code = (error as { code?: string }).code;
      if (code === 'auth/too-many-requests') {
        setError('Demasiados intentos. Espera unos minutos.');
      } else {
        setError('Error al enviar el email: ' + msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error: unknown) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleRefresh = async () => {
    try {
      await user?.reload();
      if (user?.emailVerified) {
        navigate('/dashboard');
      } else {
        setMessage('Tu email aún no ha sido verificado. Revisa tu correo o entrá al dashboard si usaste un email falso.');
      }
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Error desconocido";
      setError('Error al verificar el estado: ' + msg);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 hero-pattern">
      <div className="max-w-md w-full bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/30 shadow-level-1">

        {/* Icono */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-secondary/15 flex items-center justify-center">
            <span className="material-symbols-outlined text-secondary text-4xl">
              mark_email_read
            </span>
          </div>
        </div>

        {/* Título */}
        <div className="text-center mb-6">
          <h2 className="text-headline-md font-headline-md text-on-surface">
            Verifica tu email
          </h2>
          <p className="text-body-sm text-on-surface-variant mt-2">
            Enviamos un email de verificación a:
          </p>
          <p className="text-body-md font-medium text-secondary mt-1">
            {user?.email}
          </p>
        </div>

        {/* Mensajes */}
        {message && (
          <div className="mb-4 p-3 rounded-lg bg-secondary/10 border border-secondary/20 text-secondary text-body-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-error/10 border border-error/20 text-error text-body-sm">
            {error}
          </div>
        )}

        {/* Botón principal: Entrar al dashboard */}
        <button
          onClick={() => navigate('/dashboard')}
          className="w-full flex justify-center items-center gap-2 py-3 px-4 bg-secondary text-on-secondary rounded-lg font-label-md text-label-md hover:opacity-90 active:scale-[0.98] transition-all"
        >
          <span className="material-symbols-outlined text-xl">rocket_launch</span>
          Entrar al dashboard
        </button>

        <p className="text-center text-body-xs text-on-surface-variant/60 mt-2 mb-6">
          Si usaste un email real, verificalo después. Si fue falso, entrá directo.
        </p>

        {/* Instrucciones para email real */}
        <div className="bg-surface-container-low rounded-lg p-4 mb-4">
          <h3 className="text-label-md font-label-md text-on-surface mb-2">
            Si tu email es real:
          </h3>
          <ol className="text-body-sm text-on-surface-variant space-y-1.5 list-decimal list-inside">
            <li>Abre tu correo electrónico</li>
            <li>Busca el email de FireLabs</li>
            <li>Haz clic en el enlace de verificación</li>
            <li>Volvé acá y presioná "Ya verifiqué"</li>
          </ol>
        </div>

        {/* Botones secundarios */}
        <div className="space-y-2">
          <button
            onClick={handleRefresh}
            className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-outline-variant/50 bg-surface-container-low text-on-surface rounded-lg text-body-sm font-medium hover:bg-surface-container transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-lg">refresh</span>
            Ya verifiqué mi email
          </button>

          <button
            onClick={handleResendEmail}
            disabled={loading || countdown > 0}
            className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-outline-variant/50 bg-surface-container-low text-on-surface rounded-lg text-body-sm font-medium hover:bg-surface-container transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-lg">mail</span>
            {countdown > 0
              ? `Reenviar en ${countdown}s`
              : loading
              ? 'Enviando...'
              : 'Reenviar email de verificación'}
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex justify-center items-center gap-2 py-2.5 px-4 text-on-surface-variant text-body-sm hover:text-on-surface transition-all"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
            Cerrar sesión
          </button>
        </div>

        {/* Nota spam */}
        <p className="text-center text-body-xs text-on-surface-variant/40 mt-4">
          Si no ves el email, revisá tu carpeta de spam
        </p>
      </div>
    </div>
  );
};
