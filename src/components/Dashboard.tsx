
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Bot, FolderOpen, Plus, Activity, TrendingUp, Zap, Users, Clock, GitBranch, CheckCircle } from "lucide-react";
import { QuickActions } from "@/components/QuickActions";
import { RecentActivity } from "@/components/RecentActivity";
import { AgentsOverview } from "@/components/AgentsOverview";
import { ProjectsOverview } from "@/components/ProjectsOverview";
import { useAuth } from "@/contexts/AuthContext";
import { useAgents } from "@/hooks/useAgents";
import { useProjects } from "@/hooks/useProjects";

export function Dashboard() {
  const { user } = useAuth();
  const { agents } = useAgents();
  const { projects } = useProjects();

  const activeProjects = projects.filter(p => p.status === 'em_andamento' || p.status === 'em_revisao');
  const onlineAgents = agents.filter(a => a.status === 'online');

  // Mock data para demonstração - substituir por dados reais quando backend estiver conectado
  const recentActivities = [
    {
      id: '1',
      type: 'agent_created',
      description: 'Agente PO gerou requisitos para Projeto E-commerce',
      timestamp: new Date().toISOString(),
      agent: 'Product Owner Agent'
    },
    {
      id: '2',
      type: 'code_generated',
      description: 'Agente Dev implementou Módulo de Autenticação',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      agent: 'Developer Agent'
    },
    {
      id: '3',
      type: 'tests_completed',
      description: 'Agente QA executou testes no Projeto CRM',
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      agent: 'QA Agent'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="lg:hidden" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Olá, {user?.email?.split('@')[0] || 'Usuário'}! 👋
            </h1>
            <p className="text-gray-600">
              Bem-vindo ao Renum - seu hub central para criação e orquestração de agentes de IA
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2" onClick={() => window.location.href = '/agent-builder/create'}>
            <Bot className="h-4 w-4" />
            Criar Novo Agente
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" onClick={() => window.location.href = '/projects'}>
            <Plus className="h-4 w-4" />
            Iniciar Novo Projeto
          </Button>
        </div>
      </div>

      {/* Welcome Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <Bot className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {agents.length === 0 && projects.length === 0 
                  ? "Comece a criar seus agentes de IA"
                  : "Continue gerenciando seus projetos e agentes"
                }
              </h2>
              <p className="text-gray-600 mt-1">
                {agents.length === 0 && projects.length === 0 
                  ? "Use o Renum para criar agentes especializados: Product Owner, Desenvolvedor Full Stack, QA, DevOps e muito mais."
                  : `Você tem ${agents.length} agentes e ${projects.length} projetos ativos.`
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-blue-100 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total de Agentes
            </CardTitle>
            <Bot className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{agents.length}</div>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
              <Clock className="h-3 w-3" />
              {onlineAgents.length} online agora
            </p>
            <Button size="sm" className="mt-3 w-full" variant="outline" onClick={() => window.location.href = '/agent-builder'}>
              Ver Todos os Agentes
            </Button>
          </CardContent>
        </Card>

        <Card className="border-purple-100 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Projetos Ativos
            </CardTitle>
            <FolderOpen className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{activeProjects.length}</div>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
              <Clock className="h-3 w-3" />
              {projects.length} total de projetos
            </p>
            <Button size="sm" className="mt-3 w-full" variant="outline" onClick={() => window.location.href = '/projects'}>
              Ver Todos os Projetos
            </Button>
          </CardContent>
        </Card>

        <Card className="border-green-100 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Execuções Hoje
            </CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">24</div>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
              <CheckCircle className="h-3 w-3" />
              21 bem-sucedidas
            </p>
            <Button size="sm" className="mt-3 w-full" variant="outline" onClick={() => window.location.href = '/executions'}>
              Ver Execuções
            </Button>
          </CardContent>
        </Card>

        <Card className="border-orange-100 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Uso de Tokens
            </CardTitle>
            <Zap className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">15%</div>
            <Progress value={15} className="mt-2" />
            <p className="text-xs text-gray-500 mt-1">1.500 / 10.000 tokens</p>
            <Button size="sm" className="mt-3 w-full" variant="outline" onClick={() => window.location.href = '/settings'}>
              Configurações de API
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Feed de Atividades Recentes
          </CardTitle>
          <CardDescription>
            Acompanhe as atividades dos seus agentes em tempo real
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg border bg-gray-50/50">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.description}</p>
                  <p className="text-xs text-gray-500">
                    {activity.agent} • {new Date(activity.timestamp).toLocaleTimeString('pt-BR')}
                  </p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {activity.type === 'agent_created' && 'Requisitos'}
                  {activity.type === 'code_generated' && 'Código'}
                  {activity.type === 'tests_completed' && 'Testes'}
                </Badge>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline" size="sm">Ver Todas as Atividades</Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <QuickActions />
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
      </div>

      {/* Agents and Projects Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AgentsOverview />
        <ProjectsOverview />
      </div>
    </div>
  );
}
