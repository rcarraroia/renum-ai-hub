import { useState, useEffect } from "react";
import { useCodeSupport } from "@/hooks/agents/useCodeSupport";
import { AgentLayout } from "@/components/shared/AgentLayout";
import { PromptInput } from "@/components/shared/PromptInput";
import { ResponseDisplay } from "@/components/shared/ResponseDisplay";
import { CodeProjectList, CodeProject } from "@/components/agents/code/CodeProjectList";
import { CodeProjectForm } from "@/components/agents/code/CodeProjectForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { codeSupportApi } from "@/lib/api/agents";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Download, FileDown, Play, Share2 } from "lucide-react";

export default function CodeSupportPage() {
  const { isLoading: isPromptLoading, error, responses, sendPrompt } = useCodeSupport();
  const [projects, setProjects] = useState<CodeProject[]>([]);
  const [isProjectsLoading, setIsProjectsLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<CodeProject | undefined>(undefined);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("projects");
  const [codeContent, setCodeContent] = useState<string>("");
  const { toast } = useToast();

  // Carregar projetos ao montar o componente
  useEffect(() => {
    fetchProjects();
  }, []);

  // Buscar projetos da API
  const fetchProjects = async () => {
    setIsProjectsLoading(true);
    try {
      // Em ambiente de desenvolvimento, usar dados simulados
      if (import.meta.env.DEV) {
        const mockProjects: CodeProject[] = [
          {
            id: "project-1",
            name: "Componente de Botão React",
            description: "Componente de botão reutilizável com variantes e estados",
            language: "typescript",
            type: "component",
            createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
            updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          },
          {
            id: "project-2",
            name: "Utilitário de Formatação de Data",
            description: "Funções para formatação de datas em diferentes formatos",
            language: "javascript",
            type: "utility",
            createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
            updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
          },
          {
            id: "project-3",
            name: "Testes Unitários para API",
            description: "Testes automatizados para endpoints de API REST",
            language: "python",
            type: "test",
            createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
            updatedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
          },
          {
            id: "project-4",
            name: "Boilerplate para Aplicação Web",
            description: "Estrutura inicial para aplicação web com autenticação",
            language: "typescript",
            type: "boilerplate",
            createdAt: new Date(Date.now() - 86400000 * 20).toISOString(),
            updatedAt: new Date(Date.now() - 86400000 * 10).toISOString(),
          },
        ];
        
        setTimeout(() => {
          setProjects(mockProjects);
          setIsProjectsLoading(false);
        }, 1000);
        return;
      }
      
      // Em produção, buscar da API real
      const response = await codeSupportApi.getGeneratedCode();
      setProjects(response);
    } catch (err) {
      console.error("Erro ao buscar projetos:", err);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os projetos. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsProjectsLoading(false);
    }
  };

  // Manipular seleção de projeto
  const handleProjectSelect = (project: CodeProject) => {
    setSelectedProject(project);
    setActiveTab("editor");
    
    // Em um cenário real, aqui você buscaria o código do projeto
    // Para simulação, vamos gerar um código de exemplo baseado no tipo e linguagem
    let sampleCode = "";
    
    if (project.language === "javascript" || project.language === "typescript") {
      if (project.type === "component") {
        sampleCode = `import React from 'react';

/**
 * ${project.name}
 * ${project.description}
 */
export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  onClick 
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-500 hover:bg-blue-600 text-white';
      case 'secondary':
        return 'bg-gray-200 hover:bg-gray-300 text-gray-800';
      case 'danger':
        return 'bg-red-500 hover:bg-red-600 text-white';
      default:
        return 'bg-blue-500 hover:bg-blue-600 text-white';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'py-1 px-2 text-sm';
      case 'medium':
        return 'py-2 px-4 text-base';
      case 'large':
        return 'py-3 px-6 text-lg';
      default:
        return 'py-2 px-4 text-base';
    }
  };

  return (
    <button
      className={\`rounded transition-colors \${getVariantClasses()} \${getSizeClasses()}\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};`;
      } else if (project.type === "utility") {
        sampleCode = `/**
 * ${project.name}
 * ${project.description}
 */

/**
 * Formata uma data para o formato DD/MM/YYYY
 * @param {Date} date - A data a ser formatada
 * @returns {string} A data formatada
 */
export const formatDate = (date) => {
  if (!date) return '';
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  return \`\${day}/\${month}/\${year}\`;
};

/**
 * Formata uma data para o formato relativo (há X dias, há X horas, etc.)
 * @param {Date} date - A data a ser formatada
 * @returns {string} A data formatada em formato relativo
 */
export const formatRelativeDate = (date) => {
  if (!date) return '';
  
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) {
    return 'agora mesmo';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return \`há \${diffInMinutes} \${diffInMinutes === 1 ? 'minuto' : 'minutos'}\`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return \`há \${diffInHours} \${diffInHours === 1 ? 'hora' : 'horas'}\`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return \`há \${diffInDays} \${diffInDays === 1 ? 'dia' : 'dias'}\`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return \`há \${diffInMonths} \${diffInMonths === 1 ? 'mês' : 'meses'}\`;
  }
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return \`há \${diffInYears} \${diffInYears === 1 ? 'ano' : 'anos'}\`;
};`;
      }
    } else if (project.language === "python") {
      if (project.type === "test") {
        sampleCode = `import unittest
import requests
from unittest.mock import patch, MagicMock

"""
${project.name}
${project.description}
"""

class TestAPIEndpoints(unittest.TestCase):
    
    def setUp(self):
        self.base_url = "https://api.example.com/v1"
        self.headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer test-token"
        }
    
    @patch('requests.get')
    def test_get_users_success(self, mock_get):
        # Mock da resposta
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
            "users": [
                {"id": 1, "name": "John Doe", "email": "john@example.com"},
                {"id": 2, "name": "Jane Smith", "email": "jane@example.com"}
            ]
        }
        mock_get.return_value = mock_response
        
        # Chamada da API
        response = requests.get(f"{self.base_url}/users", headers=self.headers)
        
        # Verificações
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("users", data)
        self.assertEqual(len(data["users"]), 2)
        self.assertEqual(data["users"][0]["name"], "John Doe")
        
        # Verificar se a chamada foi feita corretamente
        mock_get.assert_called_once_with(
            f"{self.base_url}/users",
            headers=self.headers
        )
    
    @patch('requests.get')
    def test_get_users_error(self, mock_get):
        # Mock da resposta de erro
        mock_response = MagicMock()
        mock_response.status_code = 401
        mock_response.json.return_value = {
            "error": "Unauthorized",
            "message": "Invalid token"
        }
        mock_get.return_value = mock_response
        
        # Chamada da API
        response = requests.get(f"{self.base_url}/users", headers=self.headers)
        
        # Verificações
        self.assertEqual(response.status_code, 401)
        data = response.json()
        self.assertIn("error", data)
        self.assertEqual(data["error"], "Unauthorized")

if __name__ == '__main__':
    unittest.main()`;
      }
    }
    
    setCodeContent(sampleCode);
    
    toast({
      title: "Projeto selecionado",
      description: `Visualizando ${project.name}`,
    });
  };

  // Manipular exclusão de projeto
  const handleProjectDelete = async (projectId: string) => {
    try {
      // Atualizar localmente para feedback imediato
      setProjects(prev => prev.filter(project => project.id !== projectId));
      
      // Em produção, excluir na API
      if (!import.meta.env.DEV) {
        await codeSupportApi.deleteProject(projectId);
      }
      
      toast({
        title: "Sucesso",
        description: "Projeto excluído com sucesso.",
      });
    } catch (err) {
      console.error("Erro ao excluir projeto:", err);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o projeto.",
        variant: "destructive",
      });
      
      // Reverter mudança local em caso de erro
      fetchProjects();
    }
  };

  // Manipular criação de novo projeto
  const handleCreateProject = () => {
    setIsFormOpen(true);
  };

  // Manipular envio do formulário
  const handleFormSubmit = async (values: any) => {
    setIsFormSubmitting(true);
    try {
      // Construir prompt para geração de código
      const prompt = `
        Linguagem: ${values.language}
        Tipo: ${values.type}
        Método de geração: ${values.generationType}
        
        ${values.prompt}
      `;
      
      // Em ambiente de desenvolvimento, simular resposta
      if (import.meta.env.DEV) {
        setTimeout(() => {
          const newProject: CodeProject = {
            id: `project-${Date.now()}`,
            name: values.name,
            description: values.description,
            language: values.language,
            type: values.type,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          
          setProjects(prev => [newProject, ...prev]);
          setIsFormSubmitting(false);
          setIsFormOpen(false);
          
          // Simular mudança para aba de editor
          setSelectedProject(newProject);
          setActiveTab("editor");
          
          // Gerar código de exemplo
          let sampleCode = `// Código gerado para: ${values.name}\n// ${values.description}\n\n`;
          
          if (values.language === "javascript") {
            sampleCode += `function main() {\n  console.log("Implementação do projeto ${values.name}");\n  // TODO: Implementar funcionalidade\n}\n\nmain();`;
          } else if (values.language === "typescript") {
            sampleCode += `interface Config {\n  name: string;\n  version: string;\n}\n\nclass ${values.name.replace(/\s+/g, '')} {\n  private config: Config;\n  \n  constructor(config: Config) {\n    this.config = config;\n  }\n  \n  public run(): void {\n    console.log(\`Executando \${this.config.name} v\${this.config.version}\`);\n    // TODO: Implementar funcionalidade\n  }\n}\n\nconst app = new ${values.name.replace(/\s+/g, '')}({\n  name: "${values.name}",\n  version: "1.0.0"\n});\n\napp.run();`;
          } else if (values.language === "python") {
            sampleCode += `class ${values.name.replace(/\s+/g, '')}:\n    def __init__(self, name, version):\n        self.name = name\n        self.version = version\n    \n    def run(self):\n        print(f"Executando {self.name} v{self.version}")\n        # TODO: Implementar funcionalidade\n\ndef main():\n    app = ${values.name.replace(/\s+/g, '')}("${values.name}", "1.0.0")\n    app.run()\n\nif __name__ == "__main__":\n    main()`;
          }
          
          setCodeContent(sampleCode);
          
          toast({
            title: "Sucesso",
            description: "Projeto criado com sucesso.",
          });
        }, 2000);
        return;
      }
      
      // Em produção, enviar para API
      await sendPrompt(prompt);
      
      // Após gerar o código, buscar projetos atualizados
      await fetchProjects();
      
      setIsFormOpen(false);
      
      toast({
        title: "Sucesso",
        description: "Projeto criado com sucesso.",
      });
    } catch (err) {
      console.error("Erro ao criar projeto:", err);
      toast({
        title: "Erro",
        description: "Não foi possível criar o projeto. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsFormSubmitting(false);
    }
  };

  // Renderizar editor de código
  const renderCodeEditor = () => {
    if (!selectedProject) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          Selecione um projeto para visualizar o código
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{selectedProject.name}</h2>
            <p className="text-muted-foreground">{selectedProject.description}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => {
              navigator.clipboard.writeText(codeContent);
              toast({
                title: "Copiado",
                description: "Código copiado para a área de transferência.",
              });
            }}>
              <Copy className="h-4 w-4 mr-2" />
              Copiar
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            <Button variant="outline" size="sm">
              <Play className="h-4 w-4 mr-2" />
              Executar
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader className="py-2 px-4 bg-muted/50">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">
                {selectedProject.language === "javascript" ? "main.js" : 
                 selectedProject.language === "typescript" ? "main.ts" : 
                 selectedProject.language === "python" ? "main.py" : 
                 selectedProject.language === "java" ? "Main.java" : 
                 selectedProject.language === "csharp" ? "Main.cs" : "code.txt"}
              </div>
              <div className="text-xs text-muted-foreground">
                {selectedProject.language.toUpperCase()}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <pre className="p-4 overflow-auto max-h-[500px] text-sm font-mono">
              {codeContent}
            </pre>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Estrutura do Projeto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 font-mono text-sm">
              <div className="flex items-center">
                <span className="mr-2">📁</span>
                <span className="font-medium">src/</span>
              </div>
              <div className="flex items-center ml-6">
                <span className="mr-2">📄</span>
                <span>{selectedProject.language === "javascript" ? "main.js" : 
                       selectedProject.language === "typescript" ? "main.ts" : 
                       selectedProject.language === "python" ? "main.py" : 
                       selectedProject.language === "java" ? "Main.java" : 
                       selectedProject.language === "csharp" ? "Main.cs" : "code.txt"}</span>
              </div>
              {selectedProject.type === "component" && (
                <div className="flex items-center ml-6">
                  <span className="mr-2">📄</span>
                  <span>{selectedProject.language === "javascript" ? "styles.css" : 
                         selectedProject.language === "typescript" ? "styles.css" : 
                         "styles.css"}</span>
                </div>
              )}
              {selectedProject.type === "test" && (
                <div className="flex items-center ml-6">
                  <span className="mr-2">📁</span>
                  <span className="font-medium">tests/</span>
                </div>
              )}
              {selectedProject.type === "boilerplate" && (
                <>
                  <div className="flex items-center ml-6">
                    <span className="mr-2">📁</span>
                    <span className="font-medium">components/</span>
                  </div>
                  <div className="flex items-center ml-6">
                    <span className="mr-2">📁</span>
                    <span className="font-medium">utils/</span>
                  </div>
                  <div className="flex items-center ml-6">
                    <span className="mr-2">📁</span>
                    <span className="font-medium">tests/</span>
                  </div>
                </>
              )}
              <div className="flex items-center">
                <span className="mr-2">📄</span>
                <span>{selectedProject.language === "javascript" ? "package.json" : 
                       selectedProject.language === "typescript" ? "package.json" : 
                       selectedProject.language === "python" ? "requirements.txt" : 
                       selectedProject.language === "java" ? "pom.xml" : 
                       selectedProject.language === "csharp" ? "Project.csproj" : "config.txt"}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">📄</span>
                <span>README.md</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <AgentLayout
      title="Suporte à Programação"
      description="Gere código, estruturas de arquivos e testes unitários"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="projects">Projetos</TabsTrigger>
          <TabsTrigger value="editor">Editor de Código</TabsTrigger>
          <TabsTrigger value="assistant">Assistente</TabsTrigger>
        </TabsList>
        
        <TabsContent value="projects">
          <div className="flex flex-col gap-6">
            <CodeProjectList
              projects={projects}
              onProjectSelect={handleProjectSelect}
              onProjectDelete={handleProjectDelete}
              onCreateProject={handleCreateProject}
              isLoading={isProjectsLoading}
            />
            
            <CodeProjectForm
              open={isFormOpen}
              onOpenChange={setIsFormOpen}
              onSubmit={handleFormSubmit}
              isLoading={isFormSubmitting}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="editor">
          {renderCodeEditor()}
        </TabsContent>
        
        <TabsContent value="assistant">
          <div className="flex flex-col gap-6">
            {error && (
              <div className="bg-destructive/15 text-destructive p-4 rounded-md">
                {error}
              </div>
            )}
            
            <PromptInput 
              onSubmit={sendPrompt}
              isLoading={isPromptLoading}
              placeholder="Descreva o código ou estrutura que deseja gerar..."
              buttonText="Gerar Código"
            />
            
            {isPromptLoading && (
              <ResponseDisplay
                content=""
                isLoading={true}
                type="code"
              />
            )}
            
            <div className="flex flex-col gap-4">
              {responses.map(response => (
                <ResponseDisplay
                  key={response.id}
                  content={response.content}
                  timestamp={response.timestamp}
                  type={response.type}
                />
              ))}
              
              {responses.length === 0 && !isPromptLoading && (
                <div className="text-center py-8 text-muted-foreground">
                  Envie uma mensagem para começar a gerar código
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </AgentLayout>
  );
}
