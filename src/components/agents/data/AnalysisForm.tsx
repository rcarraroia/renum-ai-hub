import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dataset } from "./DatasetList";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const analysisFormSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
  type: z.enum(["sales", "financial", "marketing", "operations", "other"]),
  dataSource: z.enum(["sample", "upload", "query"]),
  timeRange: z.enum(["last_week", "last_month", "last_quarter", "last_year", "custom"]),
  visualizationType: z.enum(["table", "bar_chart", "line_chart", "pie_chart", "mixed"]),
  prompt: z.string().min(10, "A consulta deve ter pelo menos 10 caracteres"),
});

type AnalysisFormValues = z.infer<typeof analysisFormSchema>;

interface AnalysisFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: AnalysisFormValues) => void;
  isLoading?: boolean;
}

export function AnalysisForm({
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
}: AnalysisFormProps) {
  const form = useForm<AnalysisFormValues>({
    resolver: zodResolver(analysisFormSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "sales",
      dataSource: "sample",
      timeRange: "last_month",
      visualizationType: "mixed",
      prompt: "",
    },
  });

  const handleSubmit = (values: AnalysisFormValues) => {
    onSubmit(values);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Nova Análise de Dados</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Análise</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite um nome para a análise" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descreva o objetivo desta análise" 
                      className="min-h-20 resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Dados</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="sales">Vendas</SelectItem>
                        <SelectItem value="financial">Financeiro</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="operations">Operações</SelectItem>
                        <SelectItem value="other">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="timeRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Período</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o período" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="last_week">Última semana</SelectItem>
                        <SelectItem value="last_month">Último mês</SelectItem>
                        <SelectItem value="last_quarter">Último trimestre</SelectItem>
                        <SelectItem value="last_year">Último ano</SelectItem>
                        <SelectItem value="custom">Personalizado</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="dataSource"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Fonte de Dados</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sample" id="sample" />
                        <Label htmlFor="sample">Dados de exemplo</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="upload" id="upload" />
                        <Label htmlFor="upload">Upload de arquivo</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="query" id="query" />
                        <Label htmlFor="query">Consulta personalizada</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="visualizationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Visualização</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de visualização" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="table">Tabela</SelectItem>
                      <SelectItem value="bar_chart">Gráfico de barras</SelectItem>
                      <SelectItem value="line_chart">Gráfico de linhas</SelectItem>
                      <SelectItem value="pie_chart">Gráfico de pizza</SelectItem>
                      <SelectItem value="mixed">Visualização mista</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Consulta ou Instruções</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva a análise que deseja realizar ou forneça instruções específicas..."
                      className="min-h-32 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Processando..." : "Criar Análise"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
