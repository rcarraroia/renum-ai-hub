
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Settings, List, Play, Bot } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAgentBuilder } from '@/hooks/useAgentBuilder';
import { useProjectId } from '@/hooks/useProjectId';

const AgentBuilderPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { projectId } = useProjectId();
  const { agents, agentsLoading } = useAgentBuilder(projectId);

  const handleCreateAgent = () => {
    navigate('/agent-builder/create');
  };

  const handleEditAgent = (id: string) => {
    navigate(`/agent-builder/edit/${id}`);
  };

  const handleRunAgent = (id: string) => {
    navigate(`/agent-builder/run/${id}`);
  };

  const handleViewAgentLogs = (id: string) => {
    navigate(`/agent-builder/logs/${id}`);
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-500' : 'bg-gray-400';
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' ? (
      <Badge variant="default" className="bg-green-100 text-green-800">Ativo</Badge>
    ) : (
      <Badge variant="secondary">Inativo</Badge>
    );
  };

  if (agentsLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Carregando agentes...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Builder de Agentes</h1>
          <p className="text-gray-500 mt-2">Crie, configure e gerencie seus agentes de IA personalizados</p>
        </div>
        <Button onClick={handleCreateAgent} className="bg-primary hover:bg-primary/90">
          <PlusCircle className="mr-2 h-4 w-4" /> Criar Novo Agente
        </Button>
      </div>

      {agents.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Bot className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum agente encontrado</h3>
            <p className="text-gray-500 mb-4">Comece criando seu primeiro agente de IA</p>
            <Button onClick={handleCreateAgent}>
              <PlusCircle className="mr-2 h-4 w-4" /> Criar Primeiro Agente
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <Card key={agent.id} className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <Bot className="h-5 w-5 text-blue-500 mr-2" />
                    <CardTitle className="text-xl">{agent.name}</CardTitle>
                  </div>
                  {getStatusBadge(agent.status)}
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-gray-600 min-h-[60px]">
                  {agent.description}
                </CardDescription>
                <div className="mt-4 text-xs text-gray-500">
                  Criado em: {new Date(agent.created_at).toLocaleDateString('pt-BR')}
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 px-6 py-3 flex justify-between gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEditAgent(agent.id)}>
                  <Settings className="h-4 w-4 mr-1" /> Editar
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleViewAgentLogs(agent.id)}>
                  <List className="h-4 w-4 mr-1" /> Logs
                </Button>
                <Button variant="default" size="sm" onClick={() => handleRunAgent(agent.id)}>
                  <Play className="h-4 w-4 mr-1" /> Executar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgentBuilderPage;
