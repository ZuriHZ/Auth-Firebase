// src/components/VerifyEmail.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';

export const VerifyEmail=()=> {
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
    }, 3000); // Verifica cada 3 segundos

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
      setMessage('✅ Email de verificación enviado. Revisa tu bandeja de entrada.');
      setCountdown(60); // Esperar 60 segundos antes de poder reenviar
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/too-many-requests') {
        setError('Demasiados intentos. Espera unos minutos.');
      } else {
        setError('Error al enviar el email: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleRefresh = async () => {
    try {
      await user?.reload();
      if (user?.emailVerified) {
        navigate('/dashboard');
      } else {
        setMessage('⚠️ Tu email aún no ha sido verificado. Por favor revisa tu correo.');
      }
    } catch (error) {
      setError('Error al verificar el estado');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        {/* Icono de email */}
        <div className="flex justify-center">
          <div className="bg-blue-100 rounded-full p-6">
            <svg
              className="w-16 h-16 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        {/* Título */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Verifica tu email
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Hemos enviado un email de verificación a:
          </p>
          <p className="mt-1 text-base font-medium text-blue-600">
            {user?.email}
          </p>
        </div>

        {/* Mensajes */}
        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Instrucciones */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">
            📋 Instrucciones:
          </h3>
          <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
            <li>Abre tu correo electrónico</li>
            <li>Busca el email de verificación</li>
            <li>Haz clic en el enlace de verificación</li>
            <li>Regresa a esta página y haz clic en "Ya verifiqué mi email"</li>
          </ol>
        </div>

        {/* Botones de acción */}
        <div className="space-y-3">
          <button
            onClick={handleRefresh}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            ✓ Ya verifiqué mi email
          </button>

          <button
            onClick={handleResendEmail}
            disabled={loading || countdown > 0}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {countdown > 0
              ? `Reenviar en ${countdown}s`
              : loading
              ? 'Enviando...'
              : '📧 Reenviar email de verificación'}
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cerrar sesión
          </button>
        </div>

        {/* Nota sobre spam */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            💡 Si no ves el email, revisa tu carpeta de spam o correo no deseado
          </p>
        </div>
      </div>
    </div>
  );
}