// ------------------------------------------------
// CONFIGURACIÓN E INICIALIZACIÓN DE FIREBASE
// ------------------------------------------------
//
// Este archivo es el punto de entrada a Firebase.
// Toma las variables de entorno (VITE_FIREBASE_*) y
// crea las instancias de los servicios que usamos:
//   - app: la app de Firebase en sí
//   - auth: autenticación (email/password, Google, etc.)
//   - db: Realtime Database (guardar usuarios, roles, etc.)
//   - analytics: estadísticas de uso (opcional)
//   - appCheck: protección contra abuso (App Check)
//
// Las variables están en .env y empiezan con VITE_ porque
// Vite expone las env vars con ese prefijo al frontend.
// Import.meta.env es la forma de Vite de leer variables de entorno.

import { initializeApp, type FirebaseOptions } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import {
    initializeAppCheck,
    ReCaptchaEnterpriseProvider,
} from "firebase/app-check";

const firebaseConfig: FirebaseOptions = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Site key de reCAPTCHA Enterprise para App Check (por dominio web).
const recaptchaSiteKey: string = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getDatabase(app);

// ------------------------------------------------
// APP CHECK: ¿qué es y cómo desactivarlo en local?
// ------------------------------------------------
// App Check verifica que el tráfico a tus servicios Firebase
// (DB, Storage, Functions) venga de tu app real y no de bots o
// llamadas directas a la API. Emite un token que Firebase valida.
//
// SI ROMPE EL FLUJO LOCAL: comentá la línea de initializeAppCheck
// (o borrala) y reiniciá vite. Es lo único que se necesita para
// desactivarlo temporalmente mientras experimentás.
//
// DEBUG EN LOCAL (evita resolver reCAPTCHA en cada recarga):
// 1. Abrí la consola del navegador (F12) y ejecutá:
//      self.FIREBASE_APPCHECK_DEBUG_TOKEN = true
// 2. Recargá la página. La consola imprime un token tipo
//    "01234567-89ab-cdef-...". Copialo.
// 3. En la consola, persistilo con:
//      localStorage.setItem("FIREBASE_APPCHECK_DEBUG_TOKEN", "TU_TOKEN")
//    El SDK lo lee automáticamente al inicializar (ver abajo en dev).
// 4. En la consola de Firebase (App Check > Apps > AppCheck),
//    registrá ese token como "debug token" de esta app.
// El token debug solo funciona en localhost/dominios permitidos.

// En modo dev, si aún no hay debug token persistido, pedimos uno:
// el SDK imprime el token en la consola y lo guarda en localStorage.
if (
    import.meta.env.DEV &&
    !localStorage.getItem("FIREBASE_APPCHECK_DEBUG_TOKEN")
) {
    (globalThis as any).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}

export const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider(recaptchaSiteKey),
    isTokenAutoRefreshEnabled: true,
});
