
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
              onSubmit={sendPrompt}
              placeholder="Descreva o tipo de conteúdo que você precisa criar..."
              isLoading={isLoading}
            />
          </div>
          <ContentList 
            contents={[]}
            onFavorite={() => {}}
            onShare={() => {}}
            onCopy={() => {}}
            onDelete={() => {}}
          />
        </div>
        
        <div className="space-y-6">
          {responses.map((response) => (
            <ResponseDisplay
              key={response.id}
              content={response.content}
              timestamp={response.timestamp}
              title={response.title}
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
                O conteúdo gerado aparecerá aqui...
              </p>
            </div>
          )}
        </div>
      </div>
    </AgentLayout>
  );
};

export default ContentCreatorPage;
