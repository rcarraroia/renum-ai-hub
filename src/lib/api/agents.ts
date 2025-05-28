import axios from "axios";

// Configuração base do cliente axios
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// API para o RenumTaskMaster
export const taskmasterApi = {
  sendPrompt: async (prompt: string) => {
    const response = await apiClient.post("/taskmaster/prompt", { prompt });
    return response.data;
  },
  
  getTasks: async () => {
    const response = await apiClient.get("/taskmaster/tasks");
    return response.data;
  },
  
  getTask: async (id: string) => {
    const response = await apiClient.get(`/taskmaster/tasks/${id}`);
    return response.data;
  },
  
  updateTask: async (id: string, data: any) => {
    const response = await apiClient.put(`/taskmaster/tasks/${id}`, data);
    return response.data;
  },
  
  deleteTask: async (id: string) => {
    const response = await apiClient.delete(`/taskmaster/tasks/${id}`);
    return response.data;
  },
};

// API para o ContentCreatorAgent
export const contentCreatorApi = {
  sendPrompt: async (prompt: string) => {
    const response = await apiClient.post("/contentcreator/prompt", { prompt });
    return response.data;
  },
  
  getContents: async () => {
    const response = await apiClient.get("/contentcreator/contents");
    return response.data;
  },
  
  getContent: async (id: string) => {
    const response = await apiClient.get(`/contentcreator/contents/${id}`);
    return response.data;
  },
};

// API para o DataAnalystAgent
export const dataAnalystApi = {
  sendPrompt: async (prompt: string) => {
    const response = await apiClient.post("/dataanalyst/prompt", { prompt });
    return response.data;
  },
  
  getDatasets: async () => {
    const response = await apiClient.get("/dataanalyst/datasets");
    return response.data;
  },
  
  getAnalysis: async (id: string) => {
    const response = await apiClient.get(`/dataanalyst/analysis/${id}`);
    return response.data;
  },
};

// API para o CodeSupportAgent
export const codeSupportApi = {
  sendPrompt: async (prompt: string) => {
    const response = await apiClient.post("/codesupport/prompt", { prompt });
    return response.data;
  },
  
  getGeneratedCode: async (id: string) => {
    const response = await apiClient.get(`/codesupport/code/${id}`);
    return response.data;
  },
};
