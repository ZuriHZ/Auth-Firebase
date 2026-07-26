import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { AuthLabPage as AuthLabFeature } from "../../features/auth-lab";

export const AuthLabPage = () => (
  <DashboardLayout>
    <AuthLabFeature />
  </DashboardLayout>
);
