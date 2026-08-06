import type { User, UserCredential } from "firebase/auth";

export type UserRole = "admin" | "usuario";

export interface AppUser {
    id: string;
    email: string;
    nombre: string;
    rol: UserRole;
    activo: boolean;
    creado?: string;
    demo?: boolean;
}

export type AuthStatus = "loading" | "authenticated" | "anonymous";

export interface AuthMethods {
    signup: (
        email: string,
        password: string,
        displayName?: string
    ) => Promise<UserCredential>;
    login: (email: string, password: string) => Promise<UserCredential>;
    loginWithGoogle: () => Promise<UserCredential>;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    resendVerificationEmail: () => Promise<void>;
}

export type AuthContextValue =
    | (AuthMethods & {
          status: "loading";
          loading: true;
          user: null;
          appUser: null;
          userRole: null;
      })
    | (AuthMethods & {
          status: "authenticated";
          loading: false;
          user: User;
          appUser: AppUser | null;
          userRole: UserRole | null;
      })
    | (AuthMethods & {
          status: "anonymous";
          loading: false;
          user: null;
          appUser: null;
          userRole: null;
      });

declare global {
    interface ImportMetaEnv {
        readonly VITE_FIREBASE_API_KEY: string;
        readonly VITE_FIREBASE_AUTH_DOMAIN: string;
        readonly VITE_FIREBASE_DATABASE_URL: string;
        readonly VITE_FIREBASE_PROJECT_ID: string;
        readonly VITE_FIREBASE_STORAGE_BUCKET: string;
        readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
        readonly VITE_FIREBASE_APP_ID: string;
        readonly VITE_FIREBASE_MEASUREMENT_ID: string;
    }
}
