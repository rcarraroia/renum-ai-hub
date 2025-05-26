
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FolderOpen, MoreHorizontal, Users, Calendar } from "lucide-react";

export function ProjectsOverview() {
  const projects = [
    {
      id: 1,
      name: "E-commerce Platform",
      status: "Em Andamento",
      progress: 75,
      agents: ["PO Agent", "FullStack Dev", "QA Tester"],
      startDate: "15 Mai 2024",
      lastUpdate: "Hoje",
    },
    {
      id: 2,
      name: "API Gateway",
      status: "Em Revisão",
      progress: 90,
      agents: ["DevOps Master", "FullStack Dev"],
      startDate: "08 Mai 2024",
      lastUpdate: "2 horas atrás",
    },
    {
      id: 3,
      name: "Mobile App",
      status: "Em Andamento",
      progress: 45,
      agents: ["PO Agent", "FullStack Dev"],
      startDate: "20 Mai 2024",
      lastUpdate: "1 dia atrás",
    },
    {
      id: 4,
      name: "Analytics Dashboard",
      status: "Concluído",
      progress: 100,
      agents: ["FullStack Dev", "QA Tester"],
      startDate: "01 Mai 2024",
      lastUpdate: "3 dias atrás",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Em Andamento":
        return "bg-blue-100 text-blue-700";
      case "Em Revisão":
        return "bg-yellow-100 text-yellow-700";
      case "Concluído":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <FolderOpen className="h-5 w-5 text-purple-600" />
          Meus Projetos
        </CardTitle>
        <Button variant="outline" size="sm">
          Ver Todos
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-4 rounded-lg border hover:bg-gray-50 transition-colors group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                    <FolderOpen className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{project.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {project.lastUpdate}
                      </span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Progresso</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Users className="h-3 w-3" />
                    {project.agents.length} agentes
                  </div>
                  <div className="text-xs text-gray-500">
                    Iniciado em {project.startDate}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
