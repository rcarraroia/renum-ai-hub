
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "@/pages/dashboard";
import TaskMasterPage from "@/pages/taskmaster";
import ContentCreatorPage from "@/pages/content";
import DataAnalystPage from "@/pages/data";
import CodeSupportPage from "@/pages/code";
import AgentBuilderPage from "@/pages/agent-builder";
import CreateAgentPage from "@/pages/agent-builder/create";
import EditAgentPage from "@/pages/agent-builder/edit";
import RunAgentPage from "@/pages/agent-builder/run";
import LogsAgentPage from "@/pages/agent-builder/logs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
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
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
