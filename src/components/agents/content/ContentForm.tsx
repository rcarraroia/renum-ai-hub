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

const contentFormSchema = z.object({
  title: z.string().min(3, {
    message: "O título deve ter pelo menos 3 caracteres",
  }),
  description: z.string().min(10, {
    message: "A descrição deve ter pelo menos 10 caracteres",
  }),
  type: z.enum(["email", "post", "article", "other"]),
  platform: z.string().optional(),
  tone: z.enum(["formal", "casual", "professional", "friendly", "persuasive"]),
  audience: z.string().min(3, {
    message: "O público-alvo deve ter pelo menos 3 caracteres",
  }),
});

type ContentFormValues = z.infer<typeof contentFormSchema>;

interface ContentFormProps {
  defaultValues?: Partial<ContentFormValues>;
  onSubmit: (values: ContentFormValues) => Promise<void>;
  onCancel: () => void;
}

export function ContentForm({
  defaultValues,
  onSubmit,
  onCancel,
}: ContentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contentType, setContentType] = useState(defaultValues?.type || "email");

  const form = useForm<ContentFormValues>({
    resolver: zodResolver(contentFormSchema),
    defaultValues: {
      title: defaultValues?.title || "",
      description: defaultValues?.description || "",
      type: defaultValues?.type || "email",
      platform: defaultValues?.platform || "",
      tone: defaultValues?.tone || "professional",
      audience: defaultValues?.audience || "",
    },
  });

  async function handleSubmit(values: ContentFormValues) {
    try {
      setIsSubmitting(true);
      await onSubmit(values);
      toast.success("Conteúdo criado com sucesso");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar conteúdo. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const renderPlatformField = () => {
    let placeholder = "";
    let description = "";

    switch (contentType) {
      case "email":
        placeholder = "Ex: Gmail, Outlook, Campanha de Marketing";
        description = "Plataforma ou contexto do email";
        break;
      case "post":
        placeholder = "Ex: LinkedIn, Instagram, Twitter, Facebook";
        description = "Rede social onde o post será publicado";
        break;
      case "article":
        placeholder = "Ex: Blog, Medium, LinkedIn Articles";
        description = "Plataforma onde o artigo será publicado";
        break;
      default:
        placeholder = "Ex: Website, Apresentação, Relatório";
        description = "Contexto onde o conteúdo será utilizado";
    }

    return (
      <FormField
        control={form.control}
        name="platform"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Plataforma</FormLabel>
            <FormControl>
              <Input placeholder={placeholder} {...field} value={field.value || ""} />
            </FormControl>
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    );
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
                <Input placeholder="Título do conteúdo" {...field} />
              </FormControl>
              <FormDescription>
                Um título claro e conciso para o conteúdo.
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
              <FormLabel>Tipo de Conteúdo</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setContentType(value as any);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de conteúdo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="post">Post para Redes Sociais</SelectItem>
                  <SelectItem value="article">Artigo</SelectItem>
                  <SelectItem value="other">Outro</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                O tipo de conteúdo que você deseja criar.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {renderPlatformField()}

        <FormField
          control={form.control}
          name="tone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tom</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tom do conteúdo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="professional">Profissional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="friendly">Amigável</SelectItem>
                  <SelectItem value="persuasive">Persuasivo</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                O tom de voz a ser utilizado no conteúdo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="audience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Público-Alvo</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Profissionais de marketing, Estudantes, Gestores" {...field} />
              </FormControl>
              <FormDescription>
                Para quem este conteúdo está sendo criado.
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
              <FormLabel>Descrição Detalhada</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva em detalhes o que você deseja incluir neste conteúdo"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Detalhes sobre o conteúdo, pontos-chave, objetivos, etc.
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
            Criar Conteúdo
          </Button>
        </div>
      </form>
    </Form>
  );
}
