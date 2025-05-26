
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bot, MoreHorizontal, Play, Pause, Loader2 } from "lucide-react";
import { useAgents } from "@/hooks/useAgents";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export function AgentsOverview() {
  const { agents, isLoading } = useAgents();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-100 text-green-700";
      case "busy":
        return "bg-yellow-100 text-yellow-700";
      case "offline":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <Play className="h-3 w-3" />;
      case "busy":
        return <Play className="h-3 w-3" />;
      case "offline":
        return <Pause className="h-3 w-3" />;
      default:
        return <Pause className="h-3 w-3" />;
    }
  };

  const getLastActivity = (lastActivity: string) => {
    try {
      return formatDistanceToNow(new Date(lastActivity), {
        addSuffix: true,
        locale: ptBR,
      });
    } catch {
      return "Sem atividade";
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-600" />
            Meus Agentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-blue-600" />
          Meus Agentes
        </CardTitle>
        <Button variant="outline" size="sm">
          Ver Todos
        </Button>
      </CardHeader>
      <CardContent>
        {agents.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Bot className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>Nenhum agente criado ainda</p>
            <p className="text-sm">Crie seu primeiro agente para começar!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-900">{agent.name}</h4>
                      <Badge variant="secondary" className={getStatusColor(agent.status)}>
                        {getStatusIcon(agent.status)}
                        {agent.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{agent.type}</p>
                    <p className="text-xs text-gray-500">
                      {agent.last_activity ? getLastActivity(agent.last_activity) : "Sem atividade"} • {agent.tasks_count} tarefas
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
