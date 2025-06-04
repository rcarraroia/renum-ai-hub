
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
              onSendPrompt={sendPrompt}
              placeholder="Descreva os dados que você precisa analisar..."
              disabled={isLoading}
            />
          </div>
          <DatasetList />
        </div>
        
        <div className="space-y-6">
          <ResponseDisplay
            responses={responses}
            isLoading={isLoading}
            placeholder="As análises e insights aparecerão aqui..."
          />
        </div>
      </div>
    </AgentLayout>
  );
};

export default DataAnalystPage;
