
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FolderOpen, MoreHorizontal, Calendar, Loader2 } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import { formatDistanceToNow, format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function ProjectsOverview() {
  const { projects, isLoading } = useProjects();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "em_andamento":
        return "bg-blue-100 text-blue-700";
      case "em_revisao":
        return "bg-yellow-100 text-yellow-700";
      case "concluido":
        return "bg-green-100 text-green-700";
      case "pausado":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "em_andamento":
        return "Em Andamento";
      case "em_revisao":
        return "Em Revisão";
      case "concluido":
        return "Concluído";
      case "pausado":
        return "Pausado";
      default:
        return status;
    }
  };

  const getLastUpdate = (updatedAt: string) => {
    try {
      return formatDistanceToNow(new Date(updatedAt), {
        addSuffix: true,
        locale: ptBR,
      });
    } catch {
      return "Sem atualizações";
    }
  };

  const formatStartDate = (startDate: string) => {
    try {
      return format(new Date(startDate), "dd MMM yyyy", { locale: ptBR });
    } catch {
      return "Data inválida";
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-purple-600" />
            Meus Projetos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
          </div>
        </CardContent>
      </Card>
    );
  }

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
        {projects.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FolderOpen className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>Nenhum projeto criado ainda</p>
            <p className="text-sm">Inicie seu primeiro projeto!</p>
          </div>
        ) : (
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
                          {getStatusLabel(project.status)}
                        </Badge>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {getLastUpdate(project.updated_at)}
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
                    <div className="text-sm text-gray-600">
                      {project.agents_count} agentes
                    </div>
                    <div className="text-xs text-gray-500">
                      Iniciado em {project.start_date ? formatStartDate(project.start_date) : "Data não definida"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
