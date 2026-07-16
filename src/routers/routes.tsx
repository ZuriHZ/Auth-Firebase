"use client";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import {
    AuthProvider,
    ProtectedRoute,
    ProtectedDatabaseRoute,
    ProtectedAdminRoute,
    PublicRoute,
} from "../index.ts";
const Home = lazy(() =>
    import("../pages/Home.tsx").then((m) => ({ default: m.Home }))
);
const About = lazy(() =>
    import("../pages/About.tsx").then((m) => ({ default: m.About }))
);
const Login = lazy(() =>
    import("../components/Login.jsx").then((m) => ({ default: m.Login }))
);
const Register = lazy(() =>
    import("../components/Register.jsx").then((m) => ({ default: m.Register }))
);
const Dashboard = lazy(() =>
    import("../components/Dashboard.jsx").then((m) => ({
        default: m.Dashboard,
    }))
);
const VerifyEmail = lazy(() =>
    import("../context/VerifyEmail.jsx").then((m) => ({
        default: m.VerifyEmail,
    }))
);
const PageNotFound = lazy(() =>
    import("../pages/404.tsx").then((m) => ({ default: m.PageNotFound }))
);
const DataBase = lazy(() =>
    import("../pages/DatabaseUsers.tsx").then((m) => ({
        default: m.DataBase,
    }))
);
const Profile = lazy(() =>
    import("../pages/Profile.tsx").then((m) => ({ default: m.Profile }))
);
const Pricing = lazy(() =>
    import("../pages/Pricing.tsx").then((m) => ({ default: m.Pricing }))
);
const Docs = lazy(() =>
    import("../pages/Docs.tsx").then((m) => ({ default: m.Docs }))
);
const Enterprise = lazy(() =>
    import("../pages/Enterprise.tsx").then((m) => ({ default: m.Enterprise }))
);
const Terms = lazy(() =>
    import("../pages/Terms.tsx").then((m) => ({ default: m.Terms }))
);
const Privacy = lazy(() =>
    import("../pages/Privacy.tsx").then((m) => ({ default: m.Privacy }))
);
const AdminUsers = lazy(() =>
    import("../pages/AdminUsers.tsx").then((m) => ({ default: m.AdminUsers }))
);
const ProjectsPage = lazy(() =>
    import("../pages/ProjectsPage.tsx").then((m) => ({ default: m.ProjectsPage }))
);
const AuthLabPage = lazy(() =>
    import("../pages/AuthLabPage.tsx").then((m) => ({ default: m.AuthLabPage }))
);
const SettingsPage = lazy(() =>
    import("../pages/SettingsPage.tsx").then((m) => ({ default: m.SettingsPage }))
);
const FunctionsPage = lazy(() =>
    import("../pages/FunctionsPage.tsx").then((m) => ({ default: m.FunctionsPage }))
);

export const AppRoutes = () => {
    return (
        <AuthProvider>
            <Suspense>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/login"
                        element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                        }
                    />
                    <Route path="/about" element={<About />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/docs" element={<Docs />} />
                    <Route path="/enterprise" element={<Enterprise />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route
                        path="/projects"
                        element={
                            <ProtectedRoute>
                                <ProjectsPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/auth-lab"
                        element={
                            <ProtectedRoute>
                                <AuthLabPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/settings"
                        element={
                            <ProtectedRoute>
                                <SettingsPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/functions"
                        element={
                            <ProtectedAdminRoute>
                                <FunctionsPage />
                            </ProtectedAdminRoute>
                        }
                    />
                    <Route
                        path="/admin/usuarios"
                        element={
                            <ProtectedAdminRoute>
                                <AdminUsers />
                            </ProtectedAdminRoute>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <PublicRoute>
                                <Register />
                            </PublicRoute>
                        }
                    />
                    <Route path="/verify-email" element={<VerifyEmail />} />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/database"
                        element={
                            <ProtectedDatabaseRoute>
                                <DataBase />
                            </ProtectedDatabaseRoute>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Suspense>
        </AuthProvider>
    );
};

export default AppRoutes;
