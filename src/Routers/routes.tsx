"use client";
import { Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import { AuthProvider, ProtectedRoute } from "../index.ts";

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

export const AppRoutes = () => {
    return (
        <AuthProvider>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/verify-email" element={<VerifyEmail />} />

                    {/* Rutas protegidas */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Home />
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
