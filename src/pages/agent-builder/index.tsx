import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Settings, List, Play, Database } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AgentBuilderPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Dados de exemplo para agentes
  const agents = [
    {
      id: '1',
      name: 'Assistente de Conteúdo',
      description: 'Gera e-mails, posts para redes sociais e outros conteúdos de marketing.',
      status: 'active',
      type: 'content',
      lastUsed: '2025-05-30T10:30:00Z'
    },
    {
      id: '2',
      name: 'Analista de Dados',
      description: 'Analisa conjuntos de dados, gera insights e visualizações.',
      status: 'active',
      type: 'data',
      lastUsed: '2025-05-29T14:15:00Z'
    },
    {
      id: '3',
      name: 'Suporte à Programação',
      description: 'Ajuda com código, debugging e boas práticas de desenvolvimento.',
      status: 'inactive',
      type: 'code',
      lastUsed: '2025-05-25T09:45:00Z'
    }
  ];

  const handleCreateAgent = () => {
    navigate('/agent-builder/create');
  };

  const handleEditAgent = (id: string) => {
    navigate(`/agent-builder/edit/${id}`);
  };

  const handleRunAgent = (id: string) => {
    navigate(`/agent-builder/run/${id}`);
  };

  const handleViewAgentHistory = (id: string) => {
    navigate(`/agent-builder/history/${id}`);
  };

  const getAgentStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-500' : 'bg-gray-400';
  };

  const getAgentTypeIcon = (type: string) => {
    switch (type) {
      case 'content':
        return <PlusCircle className="h-5 w-5 text-blue-500" />;
      case 'data':
        return <Database className="h-5 w-5 text-purple-500" />;
      case 'code':
        return <Settings className="h-5 w-5 text-orange-500" />;
      default:
        return <Settings className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Agente Builder</h1>
          <p className="text-gray-500 mt-2">Crie, configure e gerencie seus agentes personalizados</p>
        </div>
        <Button onClick={handleCreateAgent} className="bg-primary hover:bg-primary/90">
          <PlusCircle className="mr-2 h-4 w-4" /> Criar Novo Agente
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <Card key={agent.id} className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  {getAgentTypeIcon(agent.type)}
                  <div className="ml-2">
                    <CardTitle className="text-xl">{agent.name}</CardTitle>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className={`h-3 w-3 rounded-full ${getAgentStatusColor(agent.status)} mr-2`}></div>
                  <span className="text-sm text-gray-500 capitalize">{agent.status}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm text-gray-600 min-h-[60px]">
                {agent.description}
              </CardDescription>
              <div className="mt-4 text-xs text-gray-500">
                Último uso: {formatDate(agent.lastUsed)}
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 px-6 py-3 flex justify-between">
              <Button variant="outline" size="sm" onClick={() => handleEditAgent(agent.id)}>
                <Settings className="h-4 w-4 mr-1" /> Configurar
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleViewAgentHistory(agent.id)}>
                <List className="h-4 w-4 mr-1" /> Histórico
              </Button>
              <Button variant="default" size="sm" onClick={() => handleRunAgent(agent.id)}>
                <Play className="h-4 w-4 mr-1" /> Executar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AgentBuilderPage;
