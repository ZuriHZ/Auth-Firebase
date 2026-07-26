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
//
// Las variables están en .env y empiezan con VITE_ porque
// Vite expone las env vars con ese prefijo al frontend.
// Import.meta.env es la forma de Vite de leer variables de entorno.

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getDatabase(app);
