import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CodeProject } from "./CodeProjectList";
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

const codeProjectFormSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
  language: z.enum(["javascript", "typescript", "python", "java", "csharp", "other"]),
  type: z.enum(["component", "utility", "test", "boilerplate", "other"]),
  generationType: z.enum(["from_scratch", "from_description", "from_example"]),
  prompt: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
});

type CodeProjectFormValues = z.infer<typeof codeProjectFormSchema>;

interface CodeProjectFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: CodeProjectFormValues) => void;
  isLoading?: boolean;
}

export function CodeProjectForm({
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
}: CodeProjectFormProps) {
  const form = useForm<CodeProjectFormValues>({
    resolver: zodResolver(codeProjectFormSchema),
    defaultValues: {
      name: "",
      description: "",
      language: "javascript",
      type: "component",
      generationType: "from_description",
      prompt: "",
    },
  });

  const handleSubmit = (values: CodeProjectFormValues) => {
    onSubmit(values);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Novo Projeto de Código</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Projeto</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite um nome para o projeto" {...field} />
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
                      placeholder="Descreva o objetivo deste projeto" 
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
                        <SelectItem value="other">Outra</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Projeto</FormLabel>
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
                        <SelectItem value="component">Componente</SelectItem>
                        <SelectItem value="utility">Utilitário</SelectItem>
                        <SelectItem value="test">Teste</SelectItem>
                        <SelectItem value="boilerplate">Boilerplate</SelectItem>
                        <SelectItem value="other">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="generationType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Tipo de Geração</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="from_scratch" id="from_scratch" />
                        <Label htmlFor="from_scratch">Criar do zero</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="from_description" id="from_description" />
                        <Label htmlFor="from_description">Baseado em descrição</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="from_example" id="from_example" />
                        <Label htmlFor="from_example">Baseado em exemplo</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição ou Exemplo</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva o código que deseja gerar ou forneça um exemplo..."
                      className="min-h-32 resize-none font-mono"
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
                {isLoading ? "Gerando..." : "Gerar Código"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
