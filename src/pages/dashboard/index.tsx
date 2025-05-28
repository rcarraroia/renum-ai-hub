import { FileCode, BarChart3, ListTodo, MessageSquare } from "lucide-react";
import { AgentCard } from "@/components/shared/AgentCard";

export default function Dashboard() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Renum AI Hub</h1>
        <p className="text-muted-foreground text-lg">
          Plataforma central para acesso aos agentes especializados do Projeto Renum
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AgentCard
          title="Gerenciador de Tarefas"
          description="Crie, organize e acompanhe suas tarefas com assistência inteligente"
          icon={<ListTodo />}
          to="/taskmaster"
          color="primary"
        />
        
        <AgentCard
          title="Criador de Conteúdo"
          description="Gere e-mails, posts e textos criativos para diversas plataformas"
          icon={<MessageSquare />}
          to="/content"
          color="secondary"
        />
        
        <AgentCard
          title="Analista de Dados"
          description="Consulte, analise e visualize dados estruturados com insights inteligentes"
          icon={<BarChart3 />}
          to="/data"
          color="accent"
        />
        
        <AgentCard
          title="Suporte à Programação"
          description="Gere código, estruturas de arquivos e testes unitários"
          icon={<FileCode />}
          to="/code"
          color="default"
        />
      </div>
    </div>
  );
}
