// --- App & Core ---
export { default as App } from './App.tsx';
export { default as routes } from './routers/routes.tsx';

// --- Components: Auth & Flow ---
export { AdminRoute, ProtectedDatabaseRoute } from './components/AdminRoute.jsx';
export { Loading } from './components/Loading.jsx';
export { Login } from './components/Login.jsx';
export { ProtectedRoute } from './components/ProtectedRoute.jsx';
export { PublicRoute } from './components/PublicRoute.jsx';
export { Register } from './components/Register.jsx';

// --- Components: Navigation ---
export { HoverImageLinks } from './components/HoverImageLinks.jsx';
export { Navbar } from './components/NavbarMovil.jsx';
export { NavbarDesktop } from './components/NavbarDesktop.tsx';
export { RevealLinks } from './components/Links.jsx';

// --- Components: Templates ---
export { AboutTemplate } from './components/AboutTemplate.tsx';
export { DataBaseTemplate } from './components/DataBaseTemplate.tsx';
export { HomeTemplate } from './components/HomeTemplate.tsx';

// --- Components: User & Data ---
export { Dashboard } from './components/Dashboard.jsx';
export { ShinyButtonDemo } from './components/ShinyButton.tsx';
export { TablaUsuarios } from './components/Usuarios.tsx';
export { UsersProfile } from './components/UsersProfile.jsx';

// --- Context & Auth Logic ---
export { AuthProvider, useAuth } from './context/AuthContext.jsx';
export { VerifyEmail } from './context/VerifyEmail.jsx';

// --- Firebase Configuration ---
export { app, auth, db } from './firebase/firebase.jsx';

// --- Pages ---
export { About } from './pages/About.tsx';
export { DataBase } from './pages/DatabaseUsers.tsx';
export { Home } from './pages/Home.tsx';
export { PageNotFound } from './pages/404.tsx';
export { Profile } from './pages/Profile.tsx';

// --- UI Components (Shadcn/ui) ---
export { ShinyButton } from './components/ui/shiny-button.tsx';

// --- Utilities ---
export { cn } from './lib/utils.ts';
export { maskEmail } from './lib/mask-email.ts';
