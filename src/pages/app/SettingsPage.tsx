import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { SettingsPage as SettingsFeature } from "../../features/settings";

export const SettingsPage = () => (
  <DashboardLayout>
    <SettingsFeature />
  </DashboardLayout>
);
