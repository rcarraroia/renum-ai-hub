import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDataAnalyst } from '@/hooks/agents/useDataAnalyst';
import { DatasetList } from '@/components/agents/data/DatasetList';
import { AnalysisForm } from '@/components/agents/data/AnalysisForm';
import { Button } from '@/components/ui/button';
import { PlusCircle, BarChart, MessageSquare, Database } from 'lucide-react';
import { AgentLayout } from '@/components/shared/AgentLayout';
import { PromptInput } from '@/components/shared/PromptInput';
import { ResponseDisplay } from '@/components/shared/ResponseDisplay';

export default function DataAnalystPage() {
  const [activeTab, setActiveTab] = useState('datasets');
  const [isCreating, setIsCreating] = useState(false);
  const [viewingDataset, setViewingDataset] = useState<any>(null);
  const { 
    datasets, 
    loading, 
    sendPrompt, 
    promptResponse, 
    isProcessing,
    createAnalysis,
    viewDataset,
    exportDataset,
    deleteDataset
  } = useDataAnalyst();

  // Resetar estado ao mudar de aba
  useEffect(() => {
    setIsCreating(false);
    setViewingDataset(null);
  }, [activeTab]);

  const handleCreateAnalysis = async (analysisData: any) => {
    await createAnalysis(analysisData);
    setIsCreating(false);
  };

  const handleViewDataset = async (id: string) => {
    const dataset = await viewDataset(id);
    setViewingDataset(dataset);
  };

  const handleExportDataset = async (id: string) => {
    await exportDataset(id);
  };

  const handleDeleteDataset = async (id: string) => {
    await deleteDataset(id);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setViewingDataset(null);
  };

  const renderDatasetContent = () => {
    if (isCreating) {
      return (
        <div className='container mx-auto py-6'>
          <h2 className='text-2xl font-bold mb-6'>Nova Análise</h2>
          <AnalysisForm 
            onSubmit={handleCreateAnalysis}
            onCancel={handleCancel}
          />
        </div>
      );
    }

    if (viewingDataset) {
      return (
        <div className='container mx-auto py-6'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-2xl font-bold'>{viewingDataset.title}</h2>
            <Button variant='outline' onClick={handleCancel}>
              Voltar
            </Button>
          </div>
          
          <div className='grid gap-6'>
            <div className='p-4 border rounded-md'>
              <h3 className='text-lg font-medium mb-2'>Informações</h3>
              <div className='grid grid-cols-2 gap-4 text-sm'>
                <div>
                  <span className='font-medium'>Tipo:</span> {viewingDataset.type}
                </div>
                <div>
                  <span className='font-medium'>Formato:</span> {viewingDataset.format}
                </div>
                <div>
                  <span className='font-medium'>Linhas:</span> {viewingDataset.rows}
                </div>
                <div>
                  <span className='font-medium'>Colunas:</span> {viewingDataset.columns}
                </div>
              </div>
            </div>
            
            <div className='p-4 border rounded-md'>
              <h3 className='text-lg font-medium mb-2'>Visualização</h3>
              <div className='p-6 bg-muted/50 rounded-md flex items-center justify-center min-h-[300px]'>
                <p className='text-muted-foreground'>
                  [Visualização simulada de {viewingDataset.format}]
                </p>
              </div>
            </div>
            
            <div className='p-4 border rounded-md'>
              <h3 className='text-lg font-medium mb-2'>Insights</h3>
              <p className='text-sm text-muted-foreground'>
                {viewingDataset.insights || 'Nenhum insight disponível para este dataset.'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className='container mx-auto py-6'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold'>Meus Datasets</h2>
          <Button onClick={() => setIsCreating(true)}>
            <PlusCircle className='h-4 w-4 mr-2' />
            Nova Análise
          </Button>
        </div>
        <DatasetList 
          datasets={datasets} 
          onView={handleViewDataset}
          onExport={handleExportDataset}
          onDelete={handleDeleteDataset}
        />
      </div>
    );
  };

  return (
    <AgentLayout
      title='DataAnalyst'
      description='Análise de dados inteligente'
      icon={<BarChart className='h-6 w-6' />}
    >
      <Tabs defaultValue='datasets' value={activeTab} onValueChange={setActiveTab} className='w-full'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='datasets'>
            <Database className='h-4 w-4 mr-2' />
            Datasets
          </TabsTrigger>
          <TabsTrigger value='assistant'>
            <MessageSquare className='h-4 w-4 mr-2' />
            Assistente
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value='datasets' className='py-4'>
          {renderDatasetContent()}
        </TabsContent>
        
        <TabsContent value='assistant' className='py-4'>
          <div className='container mx-auto py-6'>
            <h2 className='text-2xl font-bold mb-6'>Assistente de Análise</h2>
            <ResponseDisplay 
              response={promptResponse} 
              loading={isProcessing}
              placeholder='Envie um comando para o assistente de análise'
            />
            <div className='mt-6'>
              <PromptInput 
                onSubmit={sendPrompt}
                isLoading={isProcessing}
                placeholder='Ex: Analise as vendas do último trimestre e identifique tendências'
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </AgentLayout>
  );
}
