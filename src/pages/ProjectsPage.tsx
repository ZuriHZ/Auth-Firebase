import { DashboardLayout } from "../components/layouts/DashboardLayout";
import { ProjectsPage as ProjectsFeature } from "../features/projects";

export const ProjectsPage = () => (
  <DashboardLayout>
    <ProjectsFeature />
  </DashboardLayout>
);
