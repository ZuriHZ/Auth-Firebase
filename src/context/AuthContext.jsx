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
    verifyBeforeUpdateEmail,
    sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

const AuthContext = createContext({});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
    return context;
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Registrar usuario con email y contraseña
    const signup = async (email, password, displayName) => {
        const result = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        // Actualizar nombre de usuario
        if (displayName) {
            await updateProfile(result.user, { displayName });
        }
        await sendEmailVerification(result.user);
        return result;
    };

    // Reenviar email de verificación
    const resendVerificationEmail = async () => {
        if (auth.currentUser) {
            return sendEmailVerification(auth.currentUser);
        }
        throw new Error("No hay usuario autenticado");
    };

    // Iniciar sesión con email y contraseña
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Iniciar sesión con Google
    const loginWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider);
    };

    // Cerrar sesión
    const logout = () => {
        return signOut(auth);
    };

    // Restablecer contraseña
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const value = {
        user,
        signup,
        login,
        logout,
        loginWithGoogle,
        resetPassword,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
