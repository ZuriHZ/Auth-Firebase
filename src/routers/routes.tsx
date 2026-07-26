"use client";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider } from "../context/AuthContext";
import { ProtectedRoute } from "../guards/ProtectedRoute";
import { ProtectedAdminRoute } from "../guards/ProtectedAdminRoute";
import { ProtectedDatabaseRoute } from "../guards/ProtectedDatabaseRoute";
import { PublicRoute } from "../guards/PublicRoute";
const Home = lazy(() =>
    import("../pages/public/HomePage").then((m) => ({ default: m.Home }))
);
const About = lazy(() =>
    import("../pages/public/AboutPage").then((m) => ({ default: m.About }))
);
const Login = lazy(() =>
    import("../pages/auth/LoginPage").then((m) => ({ default: m.Login }))
);
const Register = lazy(() =>
    import("../pages/auth/RegisterPage").then((m) => ({ default: m.Register }))
);
const Dashboard = lazy(() =>
    import("../pages/app/DashboardPage").then((m) => ({
        default: m.Dashboard,
    }))
);
const VerifyEmail = lazy(() =>
    import("../pages/auth/VerifyEmailPage").then((m) => ({
        default: m.VerifyEmail,
    }))
);
const PageNotFound = lazy(() =>
    import("../pages/public/NotFoundPage").then((m) => ({ default: m.PageNotFound }))
);
const DataBase = lazy(() =>
    import("../pages/app/DatabasePage").then((m) => ({
        default: m.DataBase,
    }))
);
const Profile = lazy(() =>
    import("../pages/app/ProfilePage").then((m) => ({ default: m.Profile }))
);
const Pricing = lazy(() =>
    import("../pages/public/PricingPage").then((m) => ({ default: m.Pricing }))
);
const Docs = lazy(() =>
    import("../pages/public/DocsPage").then((m) => ({ default: m.Docs }))
);
const DashboardDocs = lazy(() =>
    import("../pages/app/DashboardDocsPage").then((m) => ({ default: m.DashboardDocs }))
);
const Enterprise = lazy(() =>
    import("../pages/public/EnterprisePage").then((m) => ({ default: m.Enterprise }))
);
const Terms = lazy(() =>
    import("../pages/public/TermsPage").then((m) => ({ default: m.Terms }))
);
const Privacy = lazy(() =>
    import("../pages/public/PrivacyPage").then((m) => ({ default: m.Privacy }))
);
const AdminUsers = lazy(() =>
    import("../pages/app/AdminUsersPage").then((m) => ({ default: m.AdminUsers }))
);
const ProjectsPage = lazy(() =>
    import("../pages/app/ProjectsPage").then((m) => ({ default: m.ProjectsPage }))
);
const AuthLabPage = lazy(() =>
    import("../pages/app/AuthLabPage").then((m) => ({ default: m.AuthLabPage }))
);
const SettingsPage = lazy(() =>
    import("../pages/app/SettingsPage").then((m) => ({ default: m.SettingsPage }))
);
const FunctionsPage = lazy(() =>
    import("../pages/app/FunctionsPage").then((m) => ({ default: m.FunctionsPage }))
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
                    <Route
                        path="/dashboard/docs"
                        element={
                            <ProtectedRoute>
                                <DashboardDocs />
                            </ProtectedRoute>
                        }
                    />
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
