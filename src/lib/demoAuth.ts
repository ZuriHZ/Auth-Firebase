// ------------------------------------------------
// CUENTAS DEMO PARA EL PORTFOLIO
// ------------------------------------------------
//
// Como este proyecto va a estar en un portafolio público,
// necesitamos que cualquiera pueda probarlo sin registrarse.
// Estas cuentas demo permiten entrar como admin o usuario
// con un solo click.
//
// LOGICA DE loginDemo():
//   1. Intenta CREAR la cuenta con createUserWithEmailAndPassword
//   2. Si se crea bien, guarda el nodo en la DB con demo: true
//   3. Si la cuenta YA EXISTE (auth/email-already-in-use),
//      directamente hace login (signInWithEmailAndPassword)
//
// Esto es clave porque Firebase no permite crear una cuenta
// que ya existe. Así que en el primer uso se crea, y en los
// siguientes se loguea nomás.
//
// La flag "demo: true" se guarda en la DB para identificar
// visualmente qué usuarios son demo en la tabla de admin.

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, db } from "../firebase/firebase";

export const DEMO_ACCOUNTS = [
  {
    id: "admin",
    email: "admin@firelabs.dev",
    password: "DemoAdmin2026!",
    rol: "admin",
    nombre: "Admin Demo",
    label: "Admin",
    icon: "admin_panel_settings" as const,
  },
  {
    id: "user",
    email: "user@firelabs.dev",
    password: "DemoUser2026!",
    rol: "usuario",
    nombre: "User Demo",
    label: "Usuario",
    icon: "person" as const,
  },
] as const;

export type DemoAccount = typeof DEMO_ACCOUNTS[number];

export async function loginDemo(account: DemoAccount) {
  try {
    const result = await createUserWithEmailAndPassword(
      auth,
      account.email,
      account.password
    );
    await updateProfile(result.user, {
      displayName: account.nombre,
    });
    await set(ref(db, `usuarios/${result.user.uid}`), {
      nombre: account.nombre,
      email: account.email,
      rol: account.rol,
      activo: true,
      demo: true,
    });
    return result;
  } catch (error) {
    const err = error as { code?: string };
    if (err.code === "auth/email-already-in-use") {
      return signInWithEmailAndPassword(auth, account.email, account.password);
    }
    throw error;
  }
}
