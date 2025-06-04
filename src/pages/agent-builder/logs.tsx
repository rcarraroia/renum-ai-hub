
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { useAgentBuilder } from '@/hooks/useAgentBuilder';
import { useProjectId } from '@/hooks/useProjectId';
import { ArrowLeft, User, Bot, AlertCircle, CheckCircle, Clock, Zap } from 'lucide-react';

interface ExecutionLog {
  id: string;
  timestamp: string;
  user_input: string;
  agent_response: string;
  status: 'success' | 'error' | 'pending';
  tools_used: string[];
  tokens_used?: number;
  execution_time_ms?: number;
  error_message?: string;
  metadata?: any;
}

const LogsAgentPage: React.FC = () => {
  const navigate = useNavigate();
  const { agentId } = useParams<{ agentId: string }>();
  const { toast } = useToast();
  const { projectId } = useProjectId();
  const { getAgent } = useAgentBuilder(projectId);
  
  const [agent, setAgent] = useState<any>(null);
  const [logs, setLogs] = useState<ExecutionLog[]>([]);
  const [loading, setLoading] = useState(true);

  // Dados simulados para demonstração
  const mockLogs: ExecutionLog[] = [
    {
      id: '1',
      timestamp: '2024-01-15T10:30:00Z',
      user_input: 'Crie um post para Instagram sobre sustentabilidade',
      agent_response: 'Aqui está um post sobre sustentabilidade:\n\n🌱 "Pequenas ações, grandes mudanças! Hoje escolha reutilizar ao invés de descartar. O planeta agradece! 🌍💚 #Sustentabilidade #MeioAmbiente"',
      status: 'success',
      tools_used: ['content_generator', 'hashtag_optimizer'],
      tokens_used: 156,
      execution_time_ms: 2340,
    },
    {
      id: '2',
      timestamp: '2024-01-15T10:25:00Z',
      user_input: 'Analise os dados de vendas do último trimestre',
      agent_response: 'Não foi possível processar a análise devido a erro de conexão com a base de dados.',
      status: 'error',
      tools_used: ['data_analyzer'],
      error_message: 'Conexão com banco de dados falhou após 3 tentativas',
      execution_time_ms: 5000,
    },
    {
      id: '3',
      timestamp: '2024-01-15T10:20:00Z',
      user_input: 'Gere um relatório de performance da equipe',
      agent_response: 'Relatório de Performance - Janeiro 2024\n\n• Vendas: 125% da meta\n• Atendimento: 98% de satisfação\n• Produtividade: +15% comparado ao mês anterior\n\nDestaques: João Silva (150% da meta individual), Maria Santos (100% de feedback positivo)',
      status: 'success',
      tools_used: ['report_generator', 'data_analyzer', 'chart_creator'],
      tokens_used: 423,
      execution_time_ms: 4560,
    },
    {
      id: '4',
      timestamp: '2024-01-15T10:15:00Z',
      user_input: 'Olá, como você pode me ajudar?',
      agent_response: 'Olá! Sou seu assistente de IA especializado. Posso ajudar você com:\n\n• Criação de conteúdo para redes sociais\n• Análise de dados e relatórios\n• Automação de tarefas\n• Pesquisa e síntese de informações\n\nEm que posso ajudar você hoje?',
      status: 'success',
      tools_used: [],
      tokens_used: 89,
      execution_time_ms: 1200,
    },
  ];

  useEffect(() => {
    const loadData = async () => {
      if (!agentId) return;
      
      try {
        const agentData = await getAgent(agentId);
        if (agentData) {
          setAgent(agentData);
          // Em produção, aqui faria a chamada para carregar os logs reais
          // const logsData = await getAgentLogs(agentId);
          setLogs(mockLogs);
        } else {
          toast({
            title: 'Agente não encontrado',
            description: 'O agente solicitado não foi encontrado.',
            variant: 'destructive',
          });
          navigate('/agent-builder');
        }
      } catch (error) {
        toast({
          title: 'Erro ao carregar dados',
          description: 'Ocorreu um erro ao carregar os dados do agente.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [agentId, getAgent, navigate, toast]);

  const handleBack = () => {
    navigate('/agent-builder');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge variant="default" className="bg-green-100 text-green-800">Sucesso</Badge>;
      case 'error':
        return <Badge variant="destructive">Erro</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pendente</Badge>;
      default:
        return <Badge variant="secondary">Desconhecido</Badge>;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Carregando logs...</div>
        </div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Agente não encontrado</h2>
          <Button onClick={handleBack} className="mt-4">
            Voltar para listagem
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-8">
        <Button variant="ghost" onClick={handleBack} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Histórico de Execuções</h1>
          <p className="text-gray-500 mt-2">Logs e histórico do agente: {agent.name}</p>
        </div>
        <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
          {agent.status === 'active' ? 'Ativo' : 'Inativo'}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de Execuções</p>
                <p className="text-2xl font-bold">{logs.length}</p>
              </div>
              <Bot className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Execuções com Sucesso</p>
                <p className="text-2xl font-bold text-green-600">
                  {logs.filter(log => log.status === 'success').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Erros</p>
                <p className="text-2xl font-bold text-red-600">
                  {logs.filter(log => log.status === 'error').length}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tokens Totais</p>
                <p className="text-2xl font-bold">
                  {logs.reduce((total, log) => total + (log.tokens_used || 0), 0)}
                </p>
              </div>
              <Zap className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Execuções</CardTitle>
          <CardDescription>
            Visualize todas as interações e execuções do agente
          </CardDescription>
        </CardHeader>
        <CardContent>
          {logs.length === 0 ? (
            <div className="text-center py-12">
              <Bot className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhuma execução encontrada</h3>
              <p className="text-gray-500">Este agente ainda não foi executado</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead>Entrada do Usuário</TableHead>
                  <TableHead>Resposta do Agente</TableHead>
                  <TableHead>Ferramentas</TableHead>
                  <TableHead>Tokens</TableHead>
                  <TableHead>Tempo (ms)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(log.status)}
                        {getStatusBadge(log.status)}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {formatTimestamp(log.timestamp)}
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="flex items-start gap-2">
                        <User className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm" title={log.user_input}>
                          {truncateText(log.user_input, 80)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="flex items-start gap-2">
                        <Bot className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm" title={log.agent_response}>
                          {log.status === 'error' ? 
                            (log.error_message || 'Erro na execução') : 
                            truncateText(log.agent_response, 80)
                          }
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {log.tools_used.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {log.tools_used.slice(0, 2).map((tool, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tool}
                            </Badge>
                          ))}
                          {log.tools_used.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{log.tools_used.length - 2}
                            </Badge>
                          )}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm">
                      {log.tokens_used || '-'}
                    </TableCell>
                    <TableCell className="text-sm">
                      {log.execution_time_ms || '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LogsAgentPage;
