import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "@/pages/dashboard";
import TaskMasterPage from "@/pages/taskmaster";
import ContentCreatorPage from "@/pages/content";
import DataAnalystPage from "@/pages/data";
import CodeSupportPage from "@/pages/code";

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
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
