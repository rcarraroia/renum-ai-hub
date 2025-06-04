
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FolderOpen, 
  Plus, 
  Calendar, 
  Users, 
  GitBranch, 
  Clock,
  MoreVertical,
  Eye,
  Trash2
} from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const ProjectsPage: React.FC = () => {
  const { projects, isLoading } = useProjects();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'em_andamento':
        return 'bg-blue-100 text-blue-700';
      case 'concluido':
        return 'bg-green-100 text-green-700';
      case 'em_revisao':
        return 'bg-yellow-100 text-yellow-700';
      case 'pausado':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'em_andamento':
        return 'Em Andamento';
      case 'concluido':
        return 'Concluído';
      case 'em_revisao':
        return 'Em Revisão';
      case 'pausado':
        return 'Pausado';
      default:
        return status;
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Carregando projetos...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Meus Projetos</h1>
          <p className="text-gray-500 mt-2">Gerencie todos os seus projetos de desenvolvimento com agentes IA</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" /> Criar Novo Projeto
        </Button>
      </div>

      {projects.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <FolderOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum projeto encontrado</h3>
            <p className="text-gray-500 mb-4">Comece criando seu primeiro projeto com agentes IA</p>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Criar Primeiro Projeto
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <FolderOpen className="h-5 w-5 text-blue-500" />
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                  </div>
                  <Badge className={getStatusColor(project.status)}>
                    {getStatusLabel(project.status)}
                  </Badge>
                </div>
                {project.description && (
                  <CardDescription className="text-sm">
                    {project.description}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progresso</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{project.agents_count} agentes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>
                      {formatDistanceToNow(new Date(project.updated_at), {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-3 w-3 mr-1" />
                    Abrir
                  </Button>
                  <Button variant="outline" size="sm">
                    <GitBranch className="h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreVertical className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
