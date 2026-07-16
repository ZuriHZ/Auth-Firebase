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

export async function loginDemo(account: typeof DEMO_ACCOUNTS[number]) {
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
