import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { DEMO_ACCOUNTS } from "../lib/demoAuth";

const demoEmails = DEMO_ACCOUNTS.map((a) => a.email);

export const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, userRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  const isDemo = user.email && demoEmails.includes(user.email);
  if (!user.emailVerified && !isDemo) {
    return <Navigate to="/verify-email" />;
  }

  if (userRole !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  return children;
};
