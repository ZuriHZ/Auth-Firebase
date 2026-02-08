// src/components/Dashboard.jsx
import { Home } from "../pages/Home";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <>
            <Home />
        </>
    );
};
