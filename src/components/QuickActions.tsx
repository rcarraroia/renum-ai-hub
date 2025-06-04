
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, FolderOpen, Play, Settings, GitBranch, Zap } from "lucide-react";

export function QuickActions() {
  const quickActions = [
    {
      title: "Criar Agente",
      description: "Novo agente especializado",
      icon: Bot,
      href: "/agent-builder/create",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Novo Projeto",
      description: "Iniciar projeto com agentes",
      icon: FolderOpen,
      href: "/projects",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Executar Teste",
      description: "Testar agentes ativos",
      icon: Play,
      href: "/executions",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Configurações",
      description: "APIs e integrações",
      icon: Settings,
      href: "/settings",
      color: "from-gray-500 to-gray-600"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-orange-600" />
          Ações Rápidas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {quickActions.map((action) => (
            <Button
              key={action.title}
              variant="outline"
              className="h-auto p-4 justify-start hover:shadow-md transition-shadow"
              onClick={() => window.location.href = action.href}
            >
              <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color} mr-3`}>
                <action.icon className="h-4 w-4 text-white" />
              </div>
              <div className="text-left">
                <div className="font-medium">{action.title}</div>
                <div className="text-xs text-gray-500">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
