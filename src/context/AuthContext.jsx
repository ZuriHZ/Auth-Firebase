// src/context/AuthContext.jsx
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
import { Loading } from "../components/Loading";
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
    const [loading, setLoading] = useState(true);
    const [minTimeElapsed, setMinTimeElapsed] = useState(false);

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

        // Crear nodo de usuario en la base de datos
        // await set(ref(db, `usuarios/${result.user.uid}`), {
        //     nombre: displayName || "",
        //     email,
        //     rol: "usuario",
        //     activo: true,
        // });

        return result;
    };

    const resendVerificationEmail = async () => {
        if (auth.currentUser) {
            return sendEmailVerification(auth.currentUser);
        }
        throw new Error("No hay usuario autenticado");
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const loginWithGoogle = async () => {
        const googleProvider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, googleProvider);
        // Asegurar nodo de usuario en la base de datos en el primer login con Google
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

    useEffect(() => {
        const timer = setTimeout(() => {
            setMinTimeElapsed(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

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
            {loading || !minTimeElapsed ? (
                <div className="grid place-content-center bg-violet-600 px-4 py-24 h-screen">
                    <Loading />
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
}
