import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { DEMO_ACCOUNTS } from "../lib/demoAuth";

const demoEmails = DEMO_ACCOUNTS.map((a) => a.email);

export const ProtectedDatabaseRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    const isDemo = user.email && demoEmails.includes(user.email);
    if (!user.emailVerified && !isDemo) {
        return <Navigate to="/verify-email" />;
    }

    return children;
};
