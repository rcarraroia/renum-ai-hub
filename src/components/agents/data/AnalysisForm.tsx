import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { toast } from "sonner";

const analysisFormSchema = z.object({
  title: z.string().min(3, {
    message: "O título deve ter pelo menos 3 caracteres",
  }),
  description: z.string().min(10, {
    message: "A descrição deve ter pelo menos 10 caracteres",
  }),
  type: z.enum(["sales", "financial", "marketing", "operations", "other"]),
  source: z.enum(["sample", "upload", "query"]),
  format: z.enum(["table", "bar", "pie", "line"]),
  period: z.string().optional(),
});

type AnalysisFormValues = z.infer<typeof analysisFormSchema>;

interface AnalysisFormProps {
  defaultValues?: Partial<AnalysisFormValues>;
  onSubmit: (values: AnalysisFormValues) => Promise<void>;
  onCancel: () => void;
}

export function AnalysisForm({
  defaultValues,
  onSubmit,
  onCancel,
}: AnalysisFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dataSource, setDataSource] = useState(defaultValues?.source || "sample");

  const form = useForm<AnalysisFormValues>({
    resolver: zodResolver(analysisFormSchema),
    defaultValues: {
      title: defaultValues?.title || "",
      description: defaultValues?.description || "",
      type: defaultValues?.type || "sales",
      source: defaultValues?.source || "sample",
      format: defaultValues?.format || "table",
      period: defaultValues?.period || "",
    },
  });

  async function handleSubmit(values: AnalysisFormValues) {
    try {
      setIsSubmitting(true);
      await onSubmit(values);
      toast.success("Análise criada com sucesso");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar análise. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const renderSourceSpecificFields = () => {
    switch (dataSource) {
      case "upload":
        return (
          <div className="p-4 border rounded-md bg-muted/50">
            <p className="text-sm text-muted-foreground mb-2">
              Funcionalidade de upload simulada para fins de demonstração.
            </p>
            <Button variant="outline" type="button" className="w-full">
              Selecionar Arquivo
            </Button>
          </div>
        );
      case "query":
        return (
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Consulta SQL</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="SELECT * FROM sales WHERE date > '2023-01-01' LIMIT 100"
                    className="font-mono text-sm"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Insira uma consulta SQL para extrair os dados necessários.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      default:
        return (
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
                      <SelectValue placeholder="Selecione o tipo de dados" />
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
                <FormDescription>
                  O tipo de dados para análise.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        );
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 w-full"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Título da análise" {...field} />
              </FormControl>
              <FormDescription>
                Um título claro e conciso para a análise.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="source"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fonte de Dados</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setDataSource(value as any);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a fonte de dados" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="sample">Dados de Amostra</SelectItem>
                  <SelectItem value="upload">Upload de Arquivo</SelectItem>
                  <SelectItem value="query">Consulta SQL</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                De onde os dados serão obtidos.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {renderSourceSpecificFields()}

        <FormField
          control={form.control}
          name="period"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Período</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Último trimestre, 2023, Jan-Mar" {...field} value={field.value || ""} />
              </FormControl>
              <FormDescription>
                Período de tempo para a análise (opcional).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="format"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Visualização</FormLabel>
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
                  <SelectItem value="bar">Gráfico de Barras</SelectItem>
                  <SelectItem value="pie">Gráfico de Pizza</SelectItem>
                  <SelectItem value="line">Gráfico de Linha</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Como os dados serão visualizados.
              </FormDescription>
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
                  placeholder="Descreva o objetivo desta análise e quais insights você espera obter"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Detalhes sobre a análise, objetivos, hipóteses, etc.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Criar Análise
          </Button>
        </div>
      </form>
    </Form>
  );
}
