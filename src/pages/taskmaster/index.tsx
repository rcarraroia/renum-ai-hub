
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
              onSubmit={sendPrompt}
              placeholder="Descreva as tarefas que você precisa organizar..."
              isLoading={isLoading}
            />
          </div>
          <TaskList 
            tasks={[]}
            onStatusChange={() => {}}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        </div>
        
        <div className="space-y-6">
          {responses.map((response) => (
            <ResponseDisplay
              key={response.id}
              content={response.content}
              timestamp={response.timestamp}
              type={response.type}
              isLoading={false}
            />
          ))}
          {isLoading && (
            <ResponseDisplay
              content=""
              isLoading={true}
            />
          )}
          {responses.length === 0 && !isLoading && (
            <div className="flex items-center justify-center p-8 text-center">
              <p className="text-muted-foreground">
                As sugestões de organização aparecerão aqui...
              </p>
            </div>
          )}
        </div>
      </div>
    </AgentLayout>
  );
};

export default TaskMasterPage;
