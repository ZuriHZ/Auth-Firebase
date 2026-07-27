// ------------------------------------------------
// CONTEXTO DE AUTENTICACIÓN (AuthProvider)
// ------------------------------------------------
//
// Este archivo es el CORAZÓN del sistema de auth.
// Usando React Context, provee a TODA la app de:
//   - user: el objeto de Firebase Auth (o null)
//   - userRole: "admin" | "usuario" | null (desde DB)
//   - loading: mientras Firebase verifica la sesión
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

import { createContext, useContext, useEffect, useState } from "react";
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
import { auth, db } from "../firebase/firebase";
import { Loading } from "../components/shared/Loading";
import { ref, set, get } from "firebase/database";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
    return context;
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    // Solo mostramos splash en la PRIMERA carga de la app.
    // Usamos sessionStorage para que al navegar entre páginas
    // o volver a la pestaña NO se vuelva a mostrar el splash.
    const [loading, setLoading] = useState(() => {
        return !sessionStorage.getItem("firelabs-auth-loaded");
    });

    // ----- SIGNUP (registro con email/password) -----
    // Crea el usuario en Firebase Auth, le asigna un nombre si
    // lo dió, envía email de verificación y guarda un nodo en
    // la Realtime DB con su rol inicial ("usuario").
    const signup = async (email, password, displayName) => {
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

    const resendVerificationEmail = async () => {
        if (auth.currentUser) {
            return sendEmailVerification(auth.currentUser);
        }
        throw new Error("No hay usuario autenticado");
    };

    // ----- LOGIN (email/password) -----
    const login = (email, password) => {
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

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    // ----- OBSERVER DE SESIÓN -----
    // onAuthStateChanged es un listener de Firebase que se
    // ejecuta CADA VEZ que el estado de auth cambia:
    //   - al iniciar la app (restaura sesión si hay token)
    //   - al hacer login/logout
    //   - al refrescar la página
    //
    // Cuando hay usuario, buscamos su rol en la Realtime DB
    // en el nodo usuarios/{uid}/rol. Si no existe, asumimos
    // "usuario" por defecto.
    //
    // El return () => unsubscribe() es crucial: limpia el
    // listener cuando el componente se desmonta para evitar
    // memory leaks.
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                try {
                    const userRef = ref(db, `usuarios/${currentUser.uid}`);
                    const snapshot = await get(userRef);
                    if (snapshot.exists()) {
                        setUserRole(snapshot.val().rol);
                    } else {
                        setUserRole("usuario");
                    }
                } catch (error) {
                    console.error("Error al obtener rol:", error);
                    setUserRole("usuario");
                }
            } else {
                setUserRole(null);
            }

            setLoading(false);
            sessionStorage.setItem("firelabs-auth-loaded", "1");
        });

        return () => unsubscribe();
    }, []);

    const value = {
        user,
        userRole,
        signup,
        login,
        logout,
        loginWithGoogle,
        resetPassword,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {loading ? (
                <div className="grid place-content-center bg-background px-4 py-24 h-screen">
                    <Loading />
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
}
