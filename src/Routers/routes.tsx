"use client";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import {
    AuthProvider,
    ProtectedRoute,
    ProtectedDatabaseRoute,
    PublicRoute,
} from "../index.ts";

// const Home = lazy(() =>
//     import("../pages/Home.tsx").then((m) => ({ default: m.Home }))
// );
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

export const AppRoutes = () => {
    return (
        <AuthProvider>
            <Suspense>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                        }
                    />
                    <Route path="/about" element={<About />} />
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
                    {/* Ruta protegida: usuarios pueden ver, solo admins pueden modificar */}
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
