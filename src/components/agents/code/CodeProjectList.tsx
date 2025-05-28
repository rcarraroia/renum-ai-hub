import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Code, 
  Copy, 
  Download, 
  FileCode, 
  Filter, 
  FolderTree, 
  MoreVertical, 
  Play, 
  Plus, 
  TestTube 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Tipos
export interface CodeProject {
  id: string;
  name: string;
  description: string;
  language: "javascript" | "typescript" | "python" | "java" | "csharp" | "other";
  type: "component" | "utility" | "test" | "boilerplate" | "other";
  createdAt: string;
  updatedAt: string;
}

interface CodeProjectListProps {
  projects: CodeProject[];
  onProjectSelect: (project: CodeProject) => void;
  onProjectDelete: (projectId: string) => void;
  onCreateProject: () => void;
  isLoading?: boolean;
}

export function CodeProjectList({
  projects,
  onProjectSelect,
  onProjectDelete,
  onCreateProject,
  isLoading = false,
}: CodeProjectListProps) {
  const [filter, setFilter] = useState<CodeProject["type"] | "all">("all");

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.type === filter);

  const getLanguageIcon = (language: CodeProject["language"]) => {
    return <Code className="h-4 w-4" />;
  };

  const getLanguageLabel = (language: CodeProject["language"]) => {
    switch (language) {
      case "javascript": return "JavaScript";
      case "typescript": return "TypeScript";
      case "python": return "Python";
      case "java": return "Java";
      case "csharp": return "C#";
      default: return "Outro";
    }
  };

  const getTypeLabel = (type: CodeProject["type"]) => {
    switch (type) {
      case "component": return "Componente";
      case "utility": return "Utilitário";
      case "test": return "Teste";
      case "boilerplate": return "Boilerplate";
      default: return "Outro";
    }
  };

  const getLanguageColor = (language: CodeProject["language"]) => {
    switch (language) {
      case "javascript": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "typescript": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "python": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "java": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "csharp": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Projetos de Código</CardTitle>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                {filter === "all" ? "Todos os tipos" : getTypeLabel(filter)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilter("all")}>
                Todos os tipos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("component")}>
                Componentes
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("utility")}>
                Utilitários
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("test")}>
                Testes
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("boilerplate")}>
                Boilerplate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("other")}>
                Outros
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" onClick={onCreateProject}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Projeto
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
            <span className="ml-2">Carregando projetos...</span>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum projeto encontrado
              </div>
            ) : (
              filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-start gap-4 p-4 border rounded-lg hover:bg-accent/10 transition-colors cursor-pointer"
                  onClick={() => onProjectSelect(project)}
                >
                  <div className="p-2 bg-primary/10 rounded-md">
                    {getLanguageIcon(project.language)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium truncate">
                        {project.name}
                      </h3>
                      <Badge className={getLanguageColor(project.language)}>
                        {getLanguageLabel(project.language)}
                      </Badge>
                      <Badge variant="outline">
                        {getTypeLabel(project.type)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <span>Criado em: {new Date(project.createdAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>Atualizado em: {new Date(project.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Ações</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        onProjectSelect(project);
                      }}>
                        <FileCode className="h-4 w-4 mr-2" />
                        Editar Código
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        // Implementar visualização de estrutura
                      }}>
                        <FolderTree className="h-4 w-4 mr-2" />
                        Ver Estrutura
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        // Implementar geração de testes
                      }}>
                        <TestTube className="h-4 w-4 mr-2" />
                        Gerar Testes
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        // Implementar exportação
                      }}>
                        <Download className="h-4 w-4 mr-2" />
                        Exportar
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive focus:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          onProjectDelete(project.id);
                        }}
                      >
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
