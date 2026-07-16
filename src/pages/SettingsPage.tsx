import { DashboardLayout } from "../components/layouts/DashboardLayout";
import { SettingsPage as SettingsFeature } from "../features/settings";

export const SettingsPage = () => (
  <DashboardLayout>
    <SettingsFeature />
  </DashboardLayout>
);
