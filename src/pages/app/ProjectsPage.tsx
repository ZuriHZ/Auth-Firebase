import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { ProjectsPage as ProjectsFeature } from "../../features/projects";

export const ProjectsPage = () => (
  <DashboardLayout>
    <ProjectsFeature />
  </DashboardLayout>
);
