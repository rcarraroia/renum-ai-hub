
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Bot,
  Eye,
  RotateCcw
} from 'lucide-react';

const ExecutionsPage: React.FC = () => {
  // Mock data - substituir por hook real quando backend estiver conectado
  const executions = [
    {
      id: '1',
      agentName: 'Agente Product Owner',
      projectName: 'E-commerce Platform',
      status: 'success',
      startTime: '2024-01-15T10:30:00Z',
      endTime: '2024-01-15T10:35:00Z',
      duration: '5m 23s',
      prompt: 'Criar requisitos para sistema de checkout',
      result: 'Requisitos detalhados gerados com sucesso'
    },
    {
      id: '2',
      agentName: 'Agente Desenvolvedor',
      projectName: 'CRM Sistema',
      status: 'running',
      startTime: '2024-01-15T11:00:00Z',
      prompt: 'Implementar módulo de relatórios',
      result: null
    },
    {
      id: '3',
      agentName: 'Agente QA',
      projectName: 'Mobile App',
      status: 'failed',
      startTime: '2024-01-15T09:15:00Z',
      endTime: '2024-01-15T09:20:00Z',
      duration: '4m 45s',
      prompt: 'Executar testes de performance',
      result: 'Erro: Timeout na conexão com API'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'running':
        return <Play className="h-4 w-4 text-blue-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge variant="default" className="bg-green-100 text-green-800">Concluído</Badge>;
      case 'running':
        return <Badge variant="default" className="bg-blue-100 text-blue-800">Executando</Badge>;
      case 'failed':
        return <Badge variant="destructive">Falhou</Badge>;
      default:
        return <Badge variant="secondary">Pendente</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Execuções e Testes</h1>
          <p className="text-gray-500 mt-2">Monitore todas as execuções dos seus agentes IA</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Play className="mr-2 h-4 w-4" /> Nova Execução
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Execuções</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              +12 desde ontem
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bem-sucedidas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">134</div>
            <p className="text-xs text-muted-foreground">
              86% taxa de sucesso
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Execução</CardTitle>
            <Bot className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Agentes ativos agora
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4m 32s</div>
            <p className="text-xs text-muted-foreground">
              Por execução
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Execuções</CardTitle>
          <CardDescription>
            Todas as execuções recentes dos seus agentes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {executions.map((execution) => (
              <div key={execution.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  {getStatusIcon(execution.status)}
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{execution.agentName}</h4>
                      {getStatusBadge(execution.status)}
                    </div>
                    <p className="text-sm text-gray-600">{execution.projectName}</p>
                    <p className="text-xs text-gray-500 mt-1">{execution.prompt}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-gray-600">
                    {execution.duration || 'Em andamento...'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(execution.startTime).toLocaleDateString('pt-BR')} às{' '}
                    {new Date(execution.startTime).toLocaleTimeString('pt-BR')}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-3 w-3 mr-1" />
                      Detalhes
                    </Button>
                    {execution.status === 'failed' && (
                      <Button variant="outline" size="sm">
                        <RotateCcw className="h-3 w-3 mr-1" />
                        Reexecutar
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExecutionsPage;
