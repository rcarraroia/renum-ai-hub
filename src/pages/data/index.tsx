
import React from 'react';
import { AgentLayout } from '@/components/shared/AgentLayout';
import { PromptInput } from '@/components/shared/PromptInput';
import { ResponseDisplay } from '@/components/shared/ResponseDisplay';
import { DatasetList } from '@/components/agents/data/DatasetList';
import { useDataAnalyst } from '@/hooks/agents/useDataAnalyst';
import { BarChart3 } from 'lucide-react';

const DataAnalystPage: React.FC = () => {
  const {
    isLoading,
    error,
    responses,
    sendPrompt,
  } = useDataAnalyst();

  return (
    <AgentLayout
      title="Data Analyst Agent"
      description="Assistente especializado em análise de dados"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Analista de Dados IA
            </h3>
            <PromptInput
              onSubmit={sendPrompt}
              placeholder="Descreva os dados que você precisa analisar..."
              isLoading={isLoading}
            />
          </div>
          <DatasetList 
            datasets={[]}
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
                As análises e insights aparecerão aqui...
              </p>
            </div>
          )}
        </div>
      </div>
    </AgentLayout>
  );
};

export default DataAnalystPage;
