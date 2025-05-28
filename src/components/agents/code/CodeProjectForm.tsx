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

const projectFormSchema = z.object({
  title: z.string().min(3, {
    message: "O título deve ter pelo menos 3 caracteres",
  }),
  description: z.string().min(10, {
    message: "A descrição deve ter pelo menos 10 caracteres",
  }),
  language: z.enum(["javascript", "typescript", "python", "java", "csharp", "php", "ruby", "go", "rust", "other"]),
  type: z.enum(["component", "utility", "test", "boilerplate", "other"]),
  method: z.enum(["scratch", "description", "example"]),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

interface ProjectFormProps {
  defaultValues?: Partial<ProjectFormValues>;
  onSubmit: (values: ProjectFormValues) => Promise<void>;
  onCancel: () => void;
}

export function CodeProjectForm({
  defaultValues,
  onSubmit,
  onCancel,
}: ProjectFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generationMethod, setGenerationMethod] = useState(defaultValues?.method || "description");

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: defaultValues?.title || "",
      description: defaultValues?.description || "",
      language: defaultValues?.language || "typescript",
      type: defaultValues?.type || "component",
      method: defaultValues?.method || "description",
    },
  });

  async function handleSubmit(values: ProjectFormValues) {
    try {
      setIsSubmitting(true);
      await onSubmit(values);
      toast.success("Projeto criado com sucesso");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar projeto. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const renderMethodSpecificFields = () => {
    switch (generationMethod) {
      case "example":
        return (
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código de Exemplo</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Cole aqui um código de exemplo similar ao que você deseja gerar"
                    className="font-mono text-sm min-h-[200px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  O código será usado como referência para gerar um novo componente similar.
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descreva em detalhes o que o código deve fazer, incluindo funcionalidades, comportamentos esperados, etc."
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Quanto mais detalhada a descrição, melhor será o código gerado.
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
                <Input placeholder="Título do projeto" {...field} />
              </FormControl>
              <FormDescription>
                Um título claro e conciso para o projeto.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Linguagem</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a linguagem" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="typescript">TypeScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="csharp">C#</SelectItem>
                    <SelectItem value="php">PHP</SelectItem>
                    <SelectItem value="ruby">Ruby</SelectItem>
                    <SelectItem value="go">Go</SelectItem>
                    <SelectItem value="rust">Rust</SelectItem>
                    <SelectItem value="other">Outra</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  A linguagem de programação do projeto.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de projeto" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="component">Componente</SelectItem>
                    <SelectItem value="utility">Utilitário</SelectItem>
                    <SelectItem value="test">Teste</SelectItem>
                    <SelectItem value="boilerplate">Boilerplate</SelectItem>
                    <SelectItem value="other">Outro</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  O tipo de código a ser gerado.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="method"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Método de Geração</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setGenerationMethod(value as any);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o método de geração" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="scratch">Do Zero</SelectItem>
                  <SelectItem value="description">Baseado em Descrição</SelectItem>
                  <SelectItem value="example">Baseado em Exemplo</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Como o código será gerado.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {renderMethodSpecificFields()}

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
            Criar Projeto
          </Button>
        </div>
      </form>
    </Form>
  );
}
