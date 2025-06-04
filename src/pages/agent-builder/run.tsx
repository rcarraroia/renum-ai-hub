
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useAgentBuilder } from '@/hooks/useAgentBuilder';
import { useProjectId } from '@/hooks/useProjectId';
import { ArrowLeft, Send, Bot, User, Settings, Activity } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: Date;
  metadata?: {
    function_calls?: any[];
    logs?: string[];
    tokens_used?: number;
  };
}

const RunAgentPage: React.FC = () => {
  const navigate = useNavigate();
  const { agentId } = useParams<{ agentId: string }>();
  const { toast } = useToast();
  const { projectId } = useProjectId();
  const { executeAgent, getAgent } = useAgentBuilder(projectId);
  
  const [agent, setAgent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);

  useEffect(() => {
    const loadAgent = async () => {
      if (!agentId) return;
      
      try {
        const agentData = await getAgent(agentId);
        if (agentData) {
          setAgent(agentData);
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
          title: 'Erro ao carregar agente',
          description: 'Ocorreu um erro ao carregar os dados do agente.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    loadAgent();
  }, [agentId, getAgent, navigate, toast]);

  const handleSendMessage = async () => {
    if (!message.trim() || !agentId || isExecuting) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsExecuting(true);

    try {
      const result = await executeAgent.mutateAsync({
        agentId,
        message: message.trim(),
      });

      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: result.response,
        timestamp: new Date(),
        metadata: {
          function_calls: result.function_calls,
          logs: result.logs,
          tokens_used: result.tokens_used,
        },
      };

      setMessages(prev => [...prev, agentMessage]);
    } catch (error) {
      toast({
        title: 'Erro na execução',
        description: 'Ocorreu um erro ao executar o agente. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsExecuting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleBack = () => {
    navigate('/agent-builder');
  };

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Carregando agente...</div>
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
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="flex items-center mb-8">
        <Button variant="ghost" onClick={handleBack} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Executar Agente</h1>
          <p className="text-gray-500 mt-2">Teste e interaja com o agente: {agent.name}</p>
        </div>
        <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
          {agent.status === 'active' ? 'Ativo' : 'Inativo'}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Area */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bot className="h-5 w-5 mr-2" />
                Chat com {agent.name}
              </CardTitle>
              <CardDescription>
                Envie mensagens e veja as respostas do agente em tempo real
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-gray-50 rounded-lg">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-500 py-12">
                    <Bot className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Inicie uma conversa com o agente</p>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          msg.role === 'user'
                            ? 'bg-blue-500 text-white'
                            : 'bg-white border shadow-sm'
                        }`}
                      >
                        <div className="flex items-center mb-1">
                          {msg.role === 'user' ? (
                            <User className="h-4 w-4 mr-2" />
                          ) : (
                            <Bot className="h-4 w-4 mr-2" />
                          )}
                          <span className="text-xs opacity-75">
                            {formatTimestamp(msg.timestamp)}
                          </span>
                        </div>
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                        
                        {/* Metadata for agent messages */}
                        {msg.role === 'agent' && msg.metadata && (
                          <div className="mt-2 pt-2 border-t border-gray-200">
                            {msg.metadata.function_calls && msg.metadata.function_calls.length > 0 && (
                              <div className="text-xs text-gray-600 mb-1">
                                <Settings className="h-3 w-3 inline mr-1" />
                                Ferramentas usadas: {msg.metadata.function_calls.length}
                              </div>
                            )}
                            {msg.metadata.tokens_used && (
                              <div className="text-xs text-gray-600">
                                <Activity className="h-3 w-3 inline mr-1" />
                                Tokens: {msg.metadata.tokens_used}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
                
                {isExecuting && (
                  <div className="flex justify-start">
                    <div className="bg-white border shadow-sm p-3 rounded-lg">
                      <div className="flex items-center">
                        <Bot className="h-4 w-4 mr-2" />
                        <span className="text-sm text-gray-500">
                          Agente está processando...
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua mensagem..."
                  disabled={isExecuting || agent.status !== 'active'}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isExecuting || agent.status !== 'active'}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Agent Info Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Agente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm">Nome</h4>
                <p className="text-sm text-gray-600">{agent.name}</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Descrição</h4>
                <p className="text-sm text-gray-600">{agent.description}</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Tom de Voz</h4>
                <p className="text-sm text-gray-600">{agent.tone_of_voice}</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Status</h4>
                <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
                  {agent.status === 'active' ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estatísticas da Sessão</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Mensagens enviadas:</span>
                <span className="text-sm font-semibold">
                  {messages.filter(m => m.role === 'user').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Respostas recebidas:</span>
                <span className="text-sm font-semibold">
                  {messages.filter(m => m.role === 'agent').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Tokens totais:</span>
                <span className="text-sm font-semibold">
                  {messages
                    .filter(m => m.role === 'agent')
                    .reduce((total, m) => total + (m.metadata?.tokens_used || 0), 0)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RunAgentPage;
