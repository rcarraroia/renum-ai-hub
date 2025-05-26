
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bot, MoreHorizontal, Play, Pause } from "lucide-react";

export function AgentsOverview() {
  const agents = [
    {
      id: 1,
      name: "PO Agent v2.1",
      type: "Product Owner",
      status: "online",
      description: "Especializado em requisitos e user stories",
      lastActive: "Ativo agora",
      tasks: 12,
    },
    {
      id: 2,
      name: "FullStack Dev",
      type: "Desenvolvedor Full Stack",
      status: "busy",
      description: "React, Node.js, TypeScript specialist",
      lastActive: "Trabalhando...",
      tasks: 8,
    },
    {
      id: 3,
      name: "QA Tester Pro",
      type: "QA",
      status: "online",
      description: "Testes automatizados e manuais",
      lastActive: "5 min atrás",
      tasks: 5,
    },
    {
      id: 4,
      name: "DevOps Master",
      type: "DevOps",
      status: "offline",
      description: "CI/CD, Docker, Kubernetes",
      lastActive: "2 horas atrás",
      tasks: 3,
    },
  ];

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
                  <p className="text-xs text-gray-500">{agent.lastActive} • {agent.tasks} tarefas</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
