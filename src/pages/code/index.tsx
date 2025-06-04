
import React from 'react';
import { AgentLayout } from '@/components/shared/AgentLayout';
import { PromptInput } from '@/components/shared/PromptInput';
import { ResponseDisplay } from '@/components/shared/ResponseDisplay';
import { CodeProjectList } from '@/components/agents/code/CodeProjectList';
import { useCodeSupport } from '@/hooks/agents/useCodeSupport';
import { Code2 } from 'lucide-react';

const CodeSupportPage: React.FC = () => {
  const {
    isLoading,
    error,
    responses,
    sendPrompt,
  } = useCodeSupport();

  return (
    <AgentLayout
      title="Code Support Agent"
      description="Assistente especializado em desenvolvimento de código"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Code2 className="h-5 w-5 mr-2" />
              Desenvolvedor IA
            </h3>
            <PromptInput
              onSubmit={sendPrompt}
              placeholder="Descreva o código que você precisa desenvolver..."
              isLoading={isLoading}
            />
          </div>
          <CodeProjectList 
            projects={[]}
            onView={() => {}}
            onExport={() => {}}
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
                As respostas do assistente de código aparecerão aqui...
              </p>
            </div>
          )}
        </div>
      </div>
    </AgentLayout>
  );
};

export default CodeSupportPage;
