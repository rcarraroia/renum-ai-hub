
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "@/pages/Index";
import TaskMasterPage from "@/pages/taskmaster";
import ContentCreatorPage from "@/pages/content";
import DataAnalystPage from "@/pages/data";
import CodeSupportPage from "@/pages/code";
import AgentBuilderPage from "@/pages/agent-builder";
import CreateAgentPage from "@/pages/agent-builder/create";
import EditAgentPage from "@/pages/agent-builder/edit";
import RunAgentPage from "@/pages/agent-builder/run";
import LogsAgentPage from "@/pages/agent-builder/logs";
import ProjectsPage from "@/pages/projects";
import ExecutionsPage from "@/pages/executions";
import SettingsPage from "@/pages/settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/taskmaster",
    element: <TaskMasterPage />,
  },
  {
    path: "/content",
    element: <ContentCreatorPage />,
  },
  {
    path: "/data",
    element: <DataAnalystPage />,
  },
  {
    path: "/code",
    element: <CodeSupportPage />,
  },
  {
    path: "/agent-builder",
    element: <AgentBuilderPage />,
  },
  {
    path: "/agent-builder/create",
    element: <CreateAgentPage />,
  },
  {
    path: "/agent-builder/edit/:agentId",
    element: <EditAgentPage />,
  },
  {
    path: "/agent-builder/run/:agentId",
    element: <RunAgentPage />,
  },
  {
    path: "/agent-builder/logs/:agentId",
    element: <LogsAgentPage />,
  },
  {
    path: "/projects",
    element: <ProjectsPage />,
  },
  {
    path: "/executions",
    element: <ExecutionsPage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
