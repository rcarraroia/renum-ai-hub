import { useState, useEffect } from "react";
import { useDataAnalyst } from "@/hooks/agents/useDataAnalyst";
import { AgentLayout } from "@/components/shared/AgentLayout";
import { PromptInput } from "@/components/shared/PromptInput";
import { ResponseDisplay } from "@/components/shared/ResponseDisplay";
import { DatasetList, Dataset } from "@/components/agents/data/DatasetList";
import { AnalysisForm } from "@/components/agents/data/AnalysisForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dataAnalystApi } from "@/lib/api/agents";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileDown, Share2 } from "lucide-react";

export default function DataAnalystPage() {
  const { isLoading: isPromptLoading, error, responses, sendPrompt } = useDataAnalyst();
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [isDatasetLoading, setIsDatasetLoading] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState<Dataset | undefined>(undefined);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("datasets");
  const { toast } = useToast();

  // Carregar datasets ao montar o componente
  useEffect(() => {
    fetchDatasets();
  }, []);

  // Buscar datasets da API
  const fetchDatasets = async () => {
    setIsDatasetLoading(true);
    try {
      // Em ambiente de desenvolvimento, usar dados simulados
      if (import.meta.env.DEV) {
        const mockDatasets: Dataset[] = [
          {
            id: "dataset-1",
            name: "Vendas Trimestrais 2025",
            description: "Análise das vendas por região e categoria de produto no primeiro trimestre de 2025",
            type: "sales",
            format: "chart",
            createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
            updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          },
          {
            id: "dataset-2",
            name: "Relatório Financeiro Anual",
            description: "Demonstrativo de resultados e balanço patrimonial do ano fiscal 2024",
            type: "financial",
            format: "report",
            createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
            updatedAt: new Date(Date.now() - 86400000 * 15).toISOString(),
          },
          {
            id: "dataset-3",
            name: "Métricas de Campanha de Marketing",
            description: "Análise de desempenho das campanhas de marketing digital por canal e segmento",
            type: "marketing",
            format: "chart",
            createdAt: new Date(Date.now() - 86400000 * 20).toISOString(),
            updatedAt: new Date(Date.now() - 86400000 * 10).toISOString(),
          },
          {
            id: "dataset-4",
            name: "Indicadores Operacionais",
            description: "Métricas de eficiência operacional por departamento e processo",
            type: "operations",
            format: "table",
            createdAt: new Date(Date.now() - 86400000 * 45).toISOString(),
            updatedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
          },
        ];
        
        setTimeout(() => {
          setDatasets(mockDatasets);
          setIsDatasetLoading(false);
        }, 1000);
        return;
      }
      
      // Em produção, buscar da API real
      const response = await dataAnalystApi.getDatasets();
      setDatasets(response);
    } catch (err) {
      console.error("Erro ao buscar datasets:", err);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os conjuntos de dados. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsDatasetLoading(false);
    }
  };

  // Manipular seleção de dataset
  const handleDatasetSelect = (dataset: Dataset) => {
    setSelectedDataset(dataset);
    setActiveTab("visualization");
    
    // Em um cenário real, aqui você buscaria os detalhes do dataset
    toast({
      title: "Dataset selecionado",
      description: `Visualizando ${dataset.name}`,
    });
  };

  // Manipular exclusão de dataset
  const handleDatasetDelete = async (datasetId: string) => {
    try {
      // Atualizar localmente para feedback imediato
      setDatasets(prev => prev.filter(dataset => dataset.id !== datasetId));
      
      // Em produção, excluir na API
      if (!import.meta.env.DEV) {
        await dataAnalystApi.deleteDataset(datasetId);
      }
      
      toast({
        title: "Sucesso",
        description: "Conjunto de dados excluído com sucesso.",
      });
    } catch (err) {
      console.error("Erro ao excluir dataset:", err);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o conjunto de dados.",
        variant: "destructive",
      });
      
      // Reverter mudança local em caso de erro
      fetchDatasets();
    }
  };

  // Manipular criação de nova análise
  const handleCreateAnalysis = () => {
    setIsFormOpen(true);
  };

  // Manipular envio do formulário
  const handleFormSubmit = async (values: any) => {
    setIsFormSubmitting(true);
    try {
      // Construir prompt para análise
      const prompt = `
        Tipo de dados: ${values.type}
        Fonte: ${values.dataSource}
        Período: ${values.timeRange}
        Visualização: ${values.visualizationType}
        
        ${values.prompt}
      `;
      
      // Em ambiente de desenvolvimento, simular resposta
      if (import.meta.env.DEV) {
        setTimeout(() => {
          const newDataset: Dataset = {
            id: `dataset-${Date.now()}`,
            name: values.name,
            description: values.description,
            type: values.type,
            format: values.visualizationType === "table" ? "table" : "chart",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          
          setDatasets(prev => [newDataset, ...prev]);
          setIsFormSubmitting(false);
          setIsFormOpen(false);
          
          // Simular mudança para aba de visualização
          setSelectedDataset(newDataset);
          setActiveTab("visualization");
          
          toast({
            title: "Sucesso",
            description: "Análise criada com sucesso.",
          });
        }, 2000);
        return;
      }
      
      // Em produção, enviar para API
      await sendPrompt(prompt);
      
      // Após gerar a análise, buscar datasets atualizados
      await fetchDatasets();
      
      setIsFormOpen(false);
      
      toast({
        title: "Sucesso",
        description: "Análise criada com sucesso.",
      });
    } catch (err) {
      console.error("Erro ao criar análise:", err);
      toast({
        title: "Erro",
        description: "Não foi possível criar a análise. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsFormSubmitting(false);
    }
  };

  // Renderizar visualização do dataset selecionado
  const renderDatasetVisualization = () => {
    if (!selectedDataset) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          Selecione um conjunto de dados para visualizar
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{selectedDataset.name}</h2>
            <p className="text-muted-foreground">{selectedDataset.description}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Compartilhar
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>
        
        {selectedDataset.format === "table" ? (
          <Card>
            <CardHeader>
              <CardTitle>Dados Tabulares</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-2 text-left font-medium">Categoria</th>
                      <th className="p-2 text-left font-medium">Jan</th>
                      <th className="p-2 text-left font-medium">Fev</th>
                      <th className="p-2 text-left font-medium">Mar</th>
                      <th className="p-2 text-left font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">Produto A</td>
                      <td className="p-2">R$ 12.500</td>
                      <td className="p-2">R$ 15.300</td>
                      <td className="p-2">R$ 18.200</td>
                      <td className="p-2 font-medium">R$ 46.000</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Produto B</td>
                      <td className="p-2">R$ 8.700</td>
                      <td className="p-2">R$ 9.200</td>
                      <td className="p-2">R$ 10.500</td>
                      <td className="p-2 font-medium">R$ 28.400</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Produto C</td>
                      <td className="p-2">R$ 6.300</td>
                      <td className="p-2">R$ 7.100</td>
                      <td className="p-2">R$ 7.800</td>
                      <td className="p-2 font-medium">R$ 21.200</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium">Total</td>
                      <td className="p-2 font-medium">R$ 27.500</td>
                      <td className="p-2 font-medium">R$ 31.600</td>
                      <td className="p-2 font-medium">R$ 36.500</td>
                      <td className="p-2 font-medium">R$ 95.600</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm">
                  <FileDown className="h-4 w-4 mr-2" />
                  Baixar CSV
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Vendas por Categoria</CardTitle>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  [Gráfico de Barras]
                  <p className="mt-2">Em um ambiente real, aqui seria renderizado um gráfico interativo</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Tendência Mensal</CardTitle>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  [Gráfico de Linhas]
                  <p className="mt-2">Em um ambiente real, aqui seria renderizado um gráfico interativo</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        <Card>
          <CardHeader>
            <CardTitle>Insights e Recomendações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Principais Insights:</h3>
                <ul className="mt-2 space-y-1 list-disc list-inside text-muted-foreground">
                  <li>O Produto A apresentou crescimento consistente de 15% ao mês</li>
                  <li>O Produto B manteve-se estável com crescimento moderado</li>
                  <li>Março foi o mês com melhor desempenho geral</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium">Recomendações:</h3>
                <ul className="mt-2 space-y-1 list-disc list-inside text-muted-foreground">
                  <li>Aumentar investimento em marketing para o Produto A</li>
                  <li>Revisar estratégia de preços para o Produto C</li>
                  <li>Investigar fatores que contribuíram para o desempenho em Março</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <AgentLayout
      title="Analista de Dados"
      description="Consulte, analise e visualize dados estruturados com insights inteligentes"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="datasets">Conjuntos de Dados</TabsTrigger>
          <TabsTrigger value="visualization">Visualização</TabsTrigger>
          <TabsTrigger value="assistant">Assistente</TabsTrigger>
        </TabsList>
        
        <TabsContent value="datasets">
          <div className="flex flex-col gap-6">
            <DatasetList
              datasets={datasets}
              onDatasetSelect={handleDatasetSelect}
              onDatasetDelete={handleDatasetDelete}
              onCreateAnalysis={handleCreateAnalysis}
              isLoading={isDatasetLoading}
            />
            
            <AnalysisForm
              open={isFormOpen}
              onOpenChange={setIsFormOpen}
              onSubmit={handleFormSubmit}
              isLoading={isFormSubmitting}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="visualization">
          {renderDatasetVisualization()}
        </TabsContent>
        
        <TabsContent value="assistant">
          <div className="flex flex-col gap-6">
            {error && (
              <div className="bg-destructive/15 text-destructive p-4 rounded-md">
                {error}
              </div>
            )}
            
            <PromptInput 
              onSubmit={sendPrompt}
              isLoading={isPromptLoading}
              placeholder="Descreva a análise de dados que deseja realizar..."
              buttonText="Analisar Dados"
            />
            
            {isPromptLoading && (
              <ResponseDisplay
                content=""
                isLoading={true}
                type="data"
              />
            )}
            
            <div className="flex flex-col gap-4">
              {responses.map(response => (
                <ResponseDisplay
                  key={response.id}
                  content={response.content}
                  timestamp={response.timestamp}
                  type={response.type}
                />
              ))}
              
              {responses.length === 0 && !isPromptLoading && (
                <div className="text-center py-8 text-muted-foreground">
                  Envie uma mensagem para começar a analisar dados
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </AgentLayout>
  );
}
