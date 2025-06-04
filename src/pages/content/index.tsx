
import React from 'react';
import { AgentLayout } from '@/components/shared/AgentLayout';
import { PromptInput } from '@/components/shared/PromptInput';
import { ResponseDisplay } from '@/components/shared/ResponseDisplay';
import { ContentList } from '@/components/agents/content/ContentList';
import { useContentCreator } from '@/hooks/agents/useContentCreator';
import { FileText } from 'lucide-react';

const ContentCreatorPage: React.FC = () => {
  const {
    isLoading,
    error,
    responses,
    sendPrompt,
  } = useContentCreator();

  return (
    <AgentLayout
      title="Content Creator Agent"
      description="Assistente especializado em criação de conteúdo"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Criador de Conteúdo IA
            </h3>
            <PromptInput
              onSendPrompt={sendPrompt}
              placeholder="Descreva o tipo de conteúdo que você precisa criar..."
              disabled={isLoading}
            />
          </div>
          <ContentList />
        </div>
        
        <div className="space-y-6">
          <ResponseDisplay
            responses={responses}
            isLoading={isLoading}
            placeholder="O conteúdo gerado aparecerá aqui..."
          />
        </div>
      </div>
    </AgentLayout>
  );
};

export default ContentCreatorPage;
