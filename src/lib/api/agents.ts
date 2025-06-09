import axios from "axios";

// Configuração base do cliente axios
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Função para obter project_id do localStorage
function getProjectId() {
  return localStorage.getItem('current_project_id') || '';
}

// API para o RenumTaskMaster
export const taskmasterApi = {
  sendPrompt: async (prompt: string, project_id: string) => {
    const response = await apiClient.post("/taskmaster/prompt", { prompt, project_id });
    return response.data;
  },
  
  getTasks: async (project_id: string) => {
    const response = await apiClient.get(`/taskmaster/tasks?project_id=${project_id}`);
    return response.data;
  },
  
  getTask: async (id: string, project_id: string) => {
    const response = await apiClient.get(`/taskmaster/tasks/${id}?project_id=${project_id}`);
    return response.data;
  },
  
  updateTask: async (id: string, data: any, project_id: string) => {
    data.project_id = project_id;
    const response = await apiClient.put(`/taskmaster/tasks/${id}`, data);
    return response.data;
  },
  
  deleteTask: async (id: string, project_id: string) => {
    const response = await apiClient.delete(`/taskmaster/tasks/${id}?project_id=${project_id}`);
    return response.data;
  },
};

// API para o ContentCreatorAgent
export const contentCreatorApi = {
  sendPrompt: async (prompt: string, project_id: string) => {
    const response = await apiClient.post("/contentcreator/prompt", { prompt, project_id });
    return response.data;
  },
  
  getContents: async (project_id: string) => {
    const response = await apiClient.get(`/contentcreator/contents?project_id=${project_id}`);
    return response.data;
  },
  
  getContent: async (id: string, project_id: string) => {
    const response = await apiClient.get(`/contentcreator/contents/${id}?project_id=${project_id}`);
    return response.data;
  },
};

// API para o DataAnalystAgent
export const dataAnalystApi = {
  sendPrompt: async (prompt: string, project_id: string) => {
    const response = await apiClient.post("/dataanalyst/prompt", { prompt, project_id });
    return response.data;
  },
  
  getDatasets: async (project_id: string) => {
    const response = await apiClient.get(`/dataanalyst/datasets?project_id=${project_id}`);
    return response.data;
  },
  
  getAnalysis: async (id: string, project_id: string) => {
    const response = await apiClient.get(`/dataanalyst/analysis/${id}?project_id=${project_id}`);
    return response.data;
  },
};

// API para o CodeSupportAgent
export const codeSupportApi = {
  sendPrompt: async (prompt: string, project_id: string) => {
    const response = await apiClient.post("/codesupport/prompt", { prompt, project_id });
    return response.data;
  },
  
  getGeneratedCode: async (id: string, project_id: string) => {
    const response = await apiClient.get(`/codesupport/code/${id}?project_id=${project_id}`);
    return response.data;
  },
};
