"use client";
import { Route, Routes } from "react-router";
import {
    Home,
    About,
    AuthProvider,
    Login,
    Register,
    // Dashboard,
    ProtectedRoute,
    VerifyEmail,
    Dashboard,
} from "../index.ts";
import { PageNotFound } from "../pages/404.tsx";

export const AppRoutes = () => {
    return (
        <AuthProvider>
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
        </AuthProvider>
    );
};

export default AppRoutes;
