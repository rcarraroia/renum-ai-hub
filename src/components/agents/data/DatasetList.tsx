import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Download, 
  FileSpreadsheet, 
  Filter, 
  LineChart, 
  PieChart, 
  Table, 
  MoreVertical 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Tipos
export interface Dataset {
  id: string;
  name: string;
  description: string;
  type: "sales" | "financial" | "marketing" | "operations" | "other";
  format: "table" | "chart" | "report";
  createdAt: string;
  updatedAt: string;
}

interface DatasetListProps {
  datasets: Dataset[];
  onDatasetSelect: (dataset: Dataset) => void;
  onDatasetDelete: (datasetId: string) => void;
  onCreateAnalysis: () => void;
  isLoading?: boolean;
}

export function DatasetList({
  datasets,
  onDatasetSelect,
  onDatasetDelete,
  onCreateAnalysis,
  isLoading = false,
}: DatasetListProps) {
  const [filter, setFilter] = useState<Dataset["type"] | "all">("all");

  const filteredDatasets = filter === "all" 
    ? datasets 
    : datasets.filter(dataset => dataset.type === filter);

  const getTypeIcon = (type: Dataset["type"]) => {
    switch (type) {
      case "sales": return <BarChart className="h-4 w-4" />;
      case "financial": return <LineChart className="h-4 w-4" />;
      case "marketing": return <PieChart className="h-4 w-4" />;
      case "operations": return <Table className="h-4 w-4" />;
      default: return <FileSpreadsheet className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: Dataset["type"]) => {
    switch (type) {
      case "sales": return "Vendas";
      case "financial": return "Financeiro";
      case "marketing": return "Marketing";
      case "operations": return "Operações";
      default: return "Outro";
    }
  };

  const getFormatLabel = (format: Dataset["format"]) => {
    switch (format) {
      case "table": return "Tabela";
      case "chart": return "Gráfico";
      case "report": return "Relatório";
      default: return "Outro";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Conjuntos de Dados</CardTitle>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                {filter === "all" ? "Todos os tipos" : getTypeLabel(filter)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilter("all")}>
                Todos os tipos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("sales")}>
                Vendas
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("financial")}>
                Financeiro
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("marketing")}>
                Marketing
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("operations")}>
                Operações
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("other")}>
                Outros
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" onClick={onCreateAnalysis}>
            Nova Análise
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
            <span className="ml-2">Carregando conjuntos de dados...</span>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDatasets.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum conjunto de dados encontrado
              </div>
            ) : (
              filteredDatasets.map((dataset) => (
                <div
                  key={dataset.id}
                  className="flex items-start gap-4 p-4 border rounded-lg hover:bg-accent/10 transition-colors cursor-pointer"
                  onClick={() => onDatasetSelect(dataset)}
                >
                  <div className="p-2 bg-primary/10 rounded-md">
                    {getTypeIcon(dataset.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium truncate">
                        {dataset.name}
                      </h3>
                      <Badge variant="outline">
                        {getTypeLabel(dataset.type)}
                      </Badge>
                      <Badge variant="secondary">
                        {getFormatLabel(dataset.format)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {dataset.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <span>Criado em: {new Date(dataset.createdAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>Atualizado em: {new Date(dataset.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Ações</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        onDatasetSelect(dataset);
                      }}>
                        Visualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        // Implementar exportação
                      }}>
                        <Download className="h-4 w-4 mr-2" />
                        Exportar
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive focus:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDatasetDelete(dataset.id);
                        }}
                      >
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
