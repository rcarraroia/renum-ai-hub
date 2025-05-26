
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Bot, Code, CheckCircle, GitCommit } from "lucide-react";

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "agent_created",
      title: "Agente PO criado com sucesso",
      description: "Novo Product Owner Agent configurado para o projeto E-commerce Platform",
      time: "2 minutos atrás",
      icon: Bot,
      color: "bg-blue-100 text-blue-600",
      badge: "Agente",
      badgeColor: "bg-blue-100 text-blue-700",
    },
    {
      id: 2,
      type: "code_generated",
      title: "Código gerado pelo Agente Dev",
      description: "Implementação do módulo de autenticação finalizada",
      time: "15 minutos atrás",
      icon: Code,
      color: "bg-purple-100 text-purple-600",
      badge: "Desenvolvimento",
      badgeColor: "bg-purple-100 text-purple-700",
    },
    {
      id: 3,
      type: "task_completed",
      title: "Testes automatizados concluídos",
      description: "Agente QA executou 23 testes com 100% de sucesso",
      time: "1 hora atrás",
      icon: CheckCircle,
      color: "bg-green-100 text-green-600",
      badge: "QA",
      badgeColor: "bg-green-100 text-green-700",
    },
    {
      id: 4,
      type: "deployment",
      title: "Deploy realizado com sucesso",
      description: "Projeto API Gateway deployado no Vercel",
      time: "2 horas atrás",
      icon: GitCommit,
      color: "bg-orange-100 text-orange-600",
      badge: "DevOps",
      badgeColor: "bg-orange-100 text-orange-700",
    },
    {
      id: 5,
      type: "requirements",
      title: "Requisitos atualizados",
      description: "Agente PO refinou user stories baseado no feedback",
      time: "3 horas atrás",
      icon: Bot,
      color: "bg-blue-100 text-blue-600",
      badge: "Planejamento",
      badgeColor: "bg-blue-100 text-blue-700",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-600" />
          Atividades Recentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
            >
              <div className={`p-2 rounded-lg ${activity.color} group-hover:scale-110 transition-transform`}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {activity.title}
                  </h4>
                  <Badge variant="secondary" className={activity.badgeColor}>
                    {activity.badge}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-1">{activity.description}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
