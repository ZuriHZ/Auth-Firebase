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
    <div className="min-h-screen bg-background flex items-center justify-center px-4 hero-pattern">
      <div className="max-w-sm w-full bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/30 shadow-level-1">

        {/* Icono */}
        <div className="flex justify-center mb-3">
          <div className="w-12 h-12 rounded-full bg-secondary/15 flex items-center justify-center">
            <span className="material-symbols-outlined text-secondary text-2xl">mark_email_read</span>
          </div>
        </div>

        {/* Título */}
        <div className="text-center mb-3">
          <h2 className="text-title-md font-headline-md text-on-surface">Verifica tu email</h2>
          <p className="text-body-xs text-on-surface-variant mt-1">
            Enviamos un email a <span className="font-medium text-secondary">{user?.email}</span>
          </p>
        </div>

        {/* Mensajes */}
        {message && (
          <div className="mb-2 p-2 rounded-lg bg-secondary/10 border border-secondary/20 text-secondary text-body-xs">{message}</div>
        )}
        {error && (
          <div className="mb-2 p-2 rounded-lg bg-error/10 border border-error/20 text-error text-body-xs">{error}</div>
        )}

        {/* Instrucciones */}
        <div className="bg-surface-container-low rounded-lg p-3 mb-3">
          <ol className="text-body-xs text-on-surface-variant space-y-1 list-decimal list-inside">
            <li>Abrí tu correo</li>
            <li>Buscá el email de FireLabs</li>
            <li>Hacé clic en el enlace de verificación</li>
            <li>Volvé y presioná "Ya verifiqué"</li>
          </ol>
        </div>

        {/* Botones */}
        <div className="space-y-1.5">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full flex justify-center items-center gap-1.5 py-2 px-3 bg-secondary text-on-secondary rounded-lg text-body-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined text-lg">rocket_launch</span>
            Entrar al dashboard
          </button>
          <p className="text-center text-body-xs text-on-surface-variant/50">Si tu email es falso, entrá directo</p>

          <button
            onClick={handleRefresh}
            className="w-full flex justify-center items-center gap-1.5 py-2 px-3 border border-outline-variant/50 bg-surface-container-low text-on-surface rounded-lg text-body-xs font-medium hover:bg-surface-container transition-all"
          >
            <span className="material-symbols-outlined text-base">refresh</span>
            Ya verifiqué mi email
          </button>

          <button
            onClick={handleResendEmail}
            disabled={loading || countdown > 0}
            className="w-full flex justify-center items-center gap-1.5 py-2 px-3 border border-outline-variant/50 bg-surface-container-low text-on-surface rounded-lg text-body-xs font-medium hover:bg-surface-container transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-base">mail</span>
            {countdown > 0 ? `Reenviar en ${countdown}s` : loading ? 'Enviando...' : 'Reenviar email'}
          </button>

          <button onClick={handleLogout} className="w-full text-center py-1.5 text-body-xs text-on-surface-variant/60 hover:text-on-surface transition-all">
            Cerrar sesión
          </button>
        </div>

        <p className="text-center text-body-xs text-on-surface-variant/30 mt-2">Revisá spam si no lo ves</p>
      </div>
    </div>
  );
};
