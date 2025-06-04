
import React from 'react';
import { AgentLayout } from '@/components/shared/AgentLayout';
import { PromptInput } from '@/components/shared/PromptInput';
import { ResponseDisplay } from '@/components/shared/ResponseDisplay';
import { TaskList } from '@/components/agents/taskmaster/TaskList';
import { useTaskMaster } from '@/hooks/agents/useTaskMaster';
import { CheckSquare } from 'lucide-react';

const TaskMasterPage: React.FC = () => {
  const {
    isLoading,
    error,
    responses,
    sendPrompt,
  } = useTaskMaster();

  return (
    <AgentLayout
      title="TaskMaster Agent"
      description="Assistente especializado em gerenciamento de tarefas"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <CheckSquare className="h-5 w-5 mr-2" />
              Gerenciador de Tarefas IA
            </h3>
            <PromptInput
              onSendPrompt={sendPrompt}
              placeholder="Descreva as tarefas que você precisa organizar..."
              disabled={isLoading}
            />
          </div>
          <TaskList />
        </div>
        
        <div className="space-y-6">
          <ResponseDisplay
            responses={responses}
            isLoading={isLoading}
            placeholder="As sugestões de organização aparecerão aqui..."
          />
        </div>
      </div>
    </AgentLayout>
  );
};

export default TaskMasterPage;
