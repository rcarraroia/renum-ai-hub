
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.renum.ai';

interface Agent {
  id: string;
  name: string;
  description: string;
  persona: string;
  tone_of_voice: string;
  behavioral_guidelines: string;
  status: 'active' | 'inactive';
  tools: string[];
  knowledge_documents: string[];
  credentials_id?: string;
  project_id: string;
  created_at: string;
  updated_at: string;
}

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface KnowledgeDocument {
  id: string;
  title: string;
  source_type: string;
  content: string;
}

interface Credential {
  id: string;
  name: string;
  provider: string;
  description: string;
}

interface ExecutionResult {
  response: string;
  function_calls?: any[];
  logs?: string[];
  tokens_used?: number;
}

export function useAgentBuilder(projectId?: string) {
  const queryClient = useQueryClient();

  // Lista agentes
  const { data: agents = [], isLoading: agentsLoading } = useQuery({
    queryKey: ['agents', projectId],
    queryFn: async () => {
      if (!projectId) return [];
      const response = await axios.get(`${API_BASE_URL}/agent-builder/agents?project_id=${projectId}`);
      return response.data as Agent[];
    },
    enabled: !!projectId,
  });

  // Lista ferramentas
  const { data: tools = [], isLoading: toolsLoading } = useQuery({
    queryKey: ['tools'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/agent-builder/tools`);
      return response.data as Tool[];
    },
  });

  // Lista documentos de conhecimento
  const { data: knowledgeDocuments = [], isLoading: documentsLoading } = useQuery({
    queryKey: ['knowledge-documents'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/agent-builder/knowledge-documents`);
      return response.data as KnowledgeDocument[];
    },
  });

  // Lista credenciais
  const { data: credentials = [], isLoading: credentialsLoading } = useQuery({
    queryKey: ['credentials'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/agent-builder/credentials`);
      return response.data as Credential[];
    },
  });

  // Criar agente
  const createAgent = useMutation({
    mutationFn: async (agentData: Omit<Agent, 'id' | 'created_at' | 'updated_at'>) => {
      const response = await axios.post(`${API_BASE_URL}/agent-builder/agents`, agentData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
    },
  });

  // Atualizar agente
  const updateAgent = useMutation({
    mutationFn: async ({ id, ...agentData }: Partial<Agent> & { id: string }) => {
      const response = await axios.patch(`${API_BASE_URL}/agent-builder/agents/${id}`, agentData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
    },
  });

  // Executar agente
  const executeAgent = useMutation({
    mutationFn: async ({ agentId, message }: { agentId: string; message: string }) => {
      const response = await axios.post(`${API_BASE_URL}/agent-builder/agents/${agentId}/execute`, {
        message,
      });
      return response.data as ExecutionResult;
    },
  });

  // Buscar agente por ID
  const getAgent = async (agentId: string): Promise<Agent | null> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/agent-builder/agents/${agentId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching agent:', error);
      return null;
    }
  };

  return {
    // Data
    agents,
    tools,
    knowledgeDocuments,
    credentials,
    
    // Loading states
    agentsLoading,
    toolsLoading,
    documentsLoading,
    credentialsLoading,
    
    // Mutations
    createAgent,
    updateAgent,
    executeAgent,
    
    // Functions
    getAgent,
  };
}
