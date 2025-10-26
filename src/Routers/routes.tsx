"use client";
import { Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import { AuthProvider, ProtectedRoute, ProtectedDatabaseRoute } from "../index.ts";

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

export const AppRoutes = () => {
    return (
        <AuthProvider>
            <Suspense fallback={<div></div>}>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/verify-email" element={<VerifyEmail />} />
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
                        path="/database"
                        element={
                            <ProtectedRoute>
                                <DataBase />
                            </ProtectedRoute>
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
