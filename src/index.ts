// --- App & Core ---
export { default as App } from "./App.tsx";
export { default as routes } from "./routers/routes.tsx";

// --- Components: Auth & Flow ---
export { ProtectedRoute } from "./guards/ProtectedRoute";
export { PublicRoute } from "./guards/PublicRoute";
export { ProtectedAdminRoute } from "./guards/ProtectedAdminRoute";
export { ProtectedDatabaseRoute } from "./guards/ProtectedDatabaseRoute";
export { Loading } from "./components/shared/Loading";
export { Login } from "./pages/auth/LoginPage";
export { Register } from "./pages/auth/RegisterPage";

// --- Components: Navigation ---
export { HoverImageLinks } from "./components/shared/HoverImageLinks";
export { Navbar } from "./components/layout/Navbar";
export { RevealLinks } from "./components/shared/RevealLinks";

// --- Components: User & Data ---
export { Dashboard } from "./pages/app/DashboardPage";
export { ShinyButtonDemo } from "./components/shared/ShinyButtonDemo";
export { UsersTable } from "./features/admin";
export { ProfileFeature } from "./features/profile";

// --- Context & Auth Logic ---
export { AuthProvider, useAuth } from "./context/AuthContext.jsx";
export { VerifyEmail } from "./pages/auth/VerifyEmailPage";

// --- Firebase Configuration ---
export { app, auth, db } from "./firebase/firebase.jsx";

// --- Pages ---
export { About } from "./pages/public/AboutPage";
export { DataBase } from "./pages/app/DatabasePage";
export { Home } from "./pages/public/HomePage";
export { PageNotFound } from "./pages/public/NotFoundPage";
export { Profile } from "./pages/app/ProfilePage";

// --- UI Components (Shadcn/ui) ---
export { ShinyButton } from "./components/ui/shiny-button.tsx";

// --- Utilities ---
export { cn } from "./lib/utils.ts";
export { maskEmail } from "./lib/mask-email.ts";
export { useToggleVisibility } from "./lib/mask-email.ts";
