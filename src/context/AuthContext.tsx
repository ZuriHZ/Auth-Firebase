// ------------------------------------------------
// CONTEXTO DE AUTENTICACIÓN (AuthProvider)
// ------------------------------------------------
//
// Este archivo es el CORAZÓN del sistema de auth.
// Usando React Context, provee a TODA la app de:
//   - user: el objeto de Firebase Auth (o null)
//   - appUser: el nodo enriquecido de la Realtime DB
//     (usuarios/{uid}) en tiempo real, o null
//   - userRole: "admin" | "usuario" | null (desde DB)
//   - loading: mientras Firebase verifica la sesión
//   - status: "loading" | "authenticated" | "anonymous"
//
// Cualquier componente que necesite saber quién es el
// usuario usa el hook useAuth() en vez de importar Firebase
// directamente. Esto centraliza la lógica de auth.
//
// PATRÓN CONTEXT:
//   1. createContext() crea el "conducto" de React
//   2. AuthProvider es el componente que envuelve la app
//      y pone los valores en el contexto
//   3. useAuth() es el hook para consumir el contexto
//
// NOTA: exportar useAuth (hook) junto con AuthProvider
// (componente) viola react-refresh/only-export-components.
// Es un trade-off intencional: separar el hook en otro
// archivo rompería el patrón centralizado del proyecto.
/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "firebase/auth";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
    updateProfile,
    sendEmailVerification,
} from "firebase/auth";
import { ref, set, get, onValue } from "firebase/database";
import { auth, db } from "../firebase/firebase";
import { Loading } from "../components/shared/Loading";
import type {
    AuthContextValue,
    AppUser,
    UserRole,
} from "../types";

interface UsuarioNode {
    nombre?: string;
    email?: string;
    rol?: string;
    activo?: boolean;
    creado?: string;
    demo?: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = (): AuthContextValue => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
    return context;
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [userRole, setUserRole] = useState<UserRole | null>(null);
    const [appUser, setAppUser] = useState<AppUser | null>(null);
    // showSplash: solo muestra el splash en la PRIMERA carga.
    // loading: se mantiene true hasta que onAuthStateChanged resuelva.
    // Si loading fuera false antes de tiempo, ProtectedRoute vería
    // user=null y redirigiría a / antes de que Firebase restaure la sesión.
    const [showSplash] = useState(
        () => !sessionStorage.getItem("firelabs-auth-loaded")
    );
    const [loading, setLoading] = useState(true);

    // ----- SIGNUP (registro con email/password) -----
    // Crea el usuario en Firebase Auth, le asigna un nombre si
    // lo dió, envía email de verificación y guarda un nodo en
    // la Realtime DB con su rol inicial ("usuario").
    const signup = async (email: string, password: string, displayName?: string) => {
        const result = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        if (displayName) {
            await updateProfile(result.user, { displayName });
        }
        await sendEmailVerification(result.user);

        await set(ref(db, `usuarios/${result.user.uid}`), {
            nombre: displayName || "",
            email,
            rol: "usuario",
            activo: true,
        });

        return result;
    };

    // ----- RESEND VERIFICATION EMAIL -----
    // Reenvía el email de verificación al usuario autenticado.
    // (Estaba definido pero no expuesto en el value del contexto,
    // lo que rompía VerifyEmailPage en runtime.)
    const resendVerificationEmail = async (): Promise<void> => {
        if (auth.currentUser) {
            return sendEmailVerification(auth.currentUser);
        }
        throw new Error("No hay usuario autenticado");
    };

    // ----- LOGIN (email/password) -----
    const login = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // ----- LOGIN CON GOOGLE -----
    // Usa un popup de Google. En el primer login, también crea
    // el nodo en la DB (igual que signup), pero usando get() para
    // verificar si ya existe (evita sobrescribir).
    const loginWithGoogle = async () => {
        const googleProvider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, googleProvider);
        try {
            const userRef = ref(db, `usuarios/${result.user.uid}`);
            const snapshot = await get(userRef);
            if (!snapshot.exists()) {
                await set(userRef, {
                    nombre: result.user.displayName || "",
                    email: result.user.email || "",
                    rol: "usuario",
                    activo: true,
                });
            }
        } catch (e) {
            console.error("Error creando nodo de usuario para Google:", e);
        }
        return result;
    };

    const logout = () => {
        return signOut(auth);
    };

    const resetPassword = (email: string) => {
        return sendPasswordResetEmail(auth, email);
    };

    // ----- OBSERVER DE SESIÓN -----
    // onAuthStateChanged es un listener de Firebase que se
    // ejecuta CADA VEZ que el estado de auth cambia:
    //   - al iniciar la app (restaura sesión si hay token)
    //   - al hacer login/logout
    //   - al refrescar la página
    //
    // Cuando hay usuario, nos suscribimos en tiempo real al
    // nodo usuarios/{uid} (onValue): alimenta appUser (el nodo
    // completo) y userRole. Si el nodo no existe, asumimos
    // "usuario" por defecto.
    //
    // El return () => unsubscribe() es crucial: limpia el
    // listener cuando el componente se desmonta para evitar
    // memory leaks.
    useEffect(() => {
        let appUserUnsubscribe: (() => void) | null = null;

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            if (appUserUnsubscribe) {
                appUserUnsubscribe();
                appUserUnsubscribe = null;
            }

            if (currentUser) {
                const userRef = ref(db, `usuarios/${currentUser.uid}`);
                appUserUnsubscribe = onValue(
                    userRef,
                    (snapshot) => {
                        const data = snapshot.val() as UsuarioNode | null;
                        if (snapshot.exists() && data) {
                            const rol: UserRole =
                                data.rol === "admin" ? "admin" : "usuario";
                            setAppUser({
                                id: currentUser.uid,
                                email: data.email ?? currentUser.email ?? "",
                                nombre: data.nombre ?? "",
                                rol,
                                activo: data.activo !== false,
                                creado: data.creado,
                                demo: data.demo,
                            });
                            setUserRole(rol);
                        } else {
                            setAppUser(null);
                            setUserRole("usuario");
                        }
                    },
                    (error) => {
                        console.error("Error al obtener rol:", error);
                        setUserRole("usuario");
                    }
                );
            } else {
                setAppUser(null);
                setUserRole(null);
            }

            setLoading(false);
            sessionStorage.setItem("firelabs-auth-loaded", "1");
        });

        return () => {
            if (appUserUnsubscribe) appUserUnsubscribe();
            unsubscribe();
        };
    }, []);

    const methods = {
        signup,
        login,
        logout,
        loginWithGoogle,
        resetPassword,
        resendVerificationEmail,
    };

    const value: AuthContextValue = loading
        ? {
              status: "loading",
              loading: true,
              user: null,
              appUser: null,
              userRole: null,
              ...methods,
          }
        : user
          ? {
                status: "authenticated",
                loading: false,
                user,
                appUser,
                userRole,
                ...methods,
            }
          : {
                status: "anonymous",
                loading: false,
                user: null,
                appUser: null,
                userRole: null,
                ...methods,
            };

    return (
        <AuthContext.Provider value={value}>
            {loading && showSplash ? (
                <div className="grid place-content-center bg-background px-4 py-24 h-screen">
                    <Loading />
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
}
