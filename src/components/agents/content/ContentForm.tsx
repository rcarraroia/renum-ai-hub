import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Content } from "./ContentList";
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

const contentFormSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  type: z.enum(["email", "social_post", "article", "other"]),
  platform: z.string().optional(),
  tone: z.string().optional(),
  audience: z.string().optional(),
  prompt: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
});

type ContentFormValues = z.infer<typeof contentFormSchema>;

interface ContentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: ContentFormValues) => void;
  isLoading?: boolean;
}

export function ContentForm({
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
}: ContentFormProps) {
  const form = useForm<ContentFormValues>({
    resolver: zodResolver(contentFormSchema),
    defaultValues: {
      title: "",
      type: "email",
      platform: "",
      tone: "professional",
      audience: "",
      prompt: "",
    },
  });

  const contentType = form.watch("type");

  const handleSubmit = (values: ContentFormValues) => {
    onSubmit(values);
  };

  const getPlatformOptions = () => {
    switch (contentType) {
      case "email":
        return [
          { value: "gmail", label: "Gmail" },
          { value: "outlook", label: "Outlook" },
          { value: "other_email", label: "Outro" },
        ];
      case "social_post":
        return [
          { value: "instagram", label: "Instagram" },
          { value: "twitter", label: "Twitter" },
          { value: "linkedin", label: "LinkedIn" },
          { value: "facebook", label: "Facebook" },
          { value: "tiktok", label: "TikTok" },
        ];
      case "article":
        return [
          { value: "blog", label: "Blog" },
          { value: "medium", label: "Medium" },
          { value: "news", label: "Notícia" },
          { value: "academic", label: "Acadêmico" },
        ];
      default:
        return [{ value: "other_platform", label: "Outro" }];
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Novo Conteúdo</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite um título para o conteúdo" {...field} />
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
                    <FormLabel>Tipo de Conteúdo</FormLabel>
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
                        <SelectItem value="email">E-mail</SelectItem>
                        <SelectItem value="social_post">Post para Redes Sociais</SelectItem>
                        <SelectItem value="article">Artigo</SelectItem>
                        <SelectItem value="other">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="platform"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plataforma</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a plataforma" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {getPlatformOptions().map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          <SelectValue placeholder="Selecione o tom" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="professional">Profissional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="friendly">Amigável</SelectItem>
                        <SelectItem value="formal">Formal</SelectItem>
                        <SelectItem value="enthusiastic">Entusiasmado</SelectItem>
                        <SelectItem value="humorous">Humorístico</SelectItem>
                        <SelectItem value="serious">Sério</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="audience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Público-alvo</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Profissionais de TI, Estudantes, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva o conteúdo que deseja gerar em detalhes..."
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
                {isLoading ? "Gerando..." : "Gerar Conteúdo"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
