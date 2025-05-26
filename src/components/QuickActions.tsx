
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, FolderOpen, Settings, Github, Database, Zap } from "lucide-react";

export function QuickActions() {
  const actions = [
    {
      title: "Criar Agente",
      description: "Novo agente de IA",
      icon: Bot,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Novo Projeto",
      description: "Iniciar desenvolvimento",
      icon: FolderOpen,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Conectar GitHub",
      description: "Integrar repositórios",
      icon: Github,
      color: "from-gray-700 to-gray-800",
    },
    {
      title: "Configurar Supabase",
      description: "Banco de dados",
      icon: Database,
      color: "from-green-500 to-green-600",
    },
    {
      title: "APIs & Tokens",
      description: "Gerenciar credenciais",
      icon: Zap,
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Configurações",
      description: "Preferências gerais",
      icon: Settings,
      color: "from-gray-500 to-gray-600",
    },
  ];

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-blue-600" />
          Ações Rápidas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action) => (
          <Button
            key={action.title}
            variant="ghost"
            className="w-full justify-start h-auto p-3 hover:bg-gray-50 group transition-all"
          >
            <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color} mr-3 group-hover:scale-110 transition-transform`}>
              <action.icon className="h-4 w-4 text-white" />
            </div>
            <div className="text-left">
              <div className="font-medium text-gray-900">{action.title}</div>
              <div className="text-xs text-gray-500">{action.description}</div>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
