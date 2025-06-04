
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { useAgentBuilder } from '@/hooks/useAgentBuilder';
import { useProjectId } from '@/hooks/useProjectId';
import { ArrowLeft } from 'lucide-react';

const agentSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  persona: z.string().min(1, 'Persona é obrigatória'),
  tone_of_voice: z.string().min(1, 'Tom de voz é obrigatório'),
  behavioral_guidelines: z.string().min(1, 'Diretrizes comportamentais são obrigatórias'),
  tools: z.array(z.string()).default([]),
  knowledge_documents: z.array(z.string()).default([]),
  credentials_id: z.string().optional(),
  status: z.enum(['active', 'inactive']).default('active'),
});

type AgentFormData = z.infer<typeof agentSchema>;

const CreateAgentPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { projectId } = useProjectId();
  const { tools, knowledgeDocuments, credentials, createAgent, toolsLoading, documentsLoading, credentialsLoading } = useAgentBuilder(projectId);

  const form = useForm<AgentFormData>({
    resolver: zodResolver(agentSchema),
    defaultValues: {
      name: '',
      description: '',
      persona: '',
      tone_of_voice: '',
      behavioral_guidelines: '',
      tools: [],
      knowledge_documents: [],
      credentials_id: '',
      status: 'active',
    },
  });

  const onSubmit = async (data: AgentFormData) => {
    try {
      await createAgent.mutateAsync({
        name: data.name,
        description: data.description,
        persona: data.persona,
        tone_of_voice: data.tone_of_voice,
        behavioral_guidelines: data.behavioral_guidelines,
        tools: data.tools || [],
        knowledge_documents: data.knowledge_documents || [],
        credentials_id: data.credentials_id,
        status: data.status,
        project_id: projectId,
      });
      
      toast({
        title: 'Agente criado com sucesso!',
        description: 'O agente foi criado e está pronto para uso.',
      });
      
      navigate('/agent-builder');
    } catch (error) {
      toast({
        title: 'Erro ao criar agente',
        description: 'Ocorreu um erro ao tentar criar o agente. Tente novamente.',
        variant: 'destructive',
      });
    }
  };

  const handleCancel = () => {
    navigate('/agent-builder');
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-8">
        <Button variant="ghost" onClick={handleCancel} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Criar Novo Agente</h1>
          <p className="text-gray-500 mt-2">Configure seu agente de IA personalizado</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configuração do Agente</CardTitle>
          <CardDescription>
            Defina as características e comportamentos do seu agente de IA
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Agente</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Assistente de Marketing" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tone_of_voice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tom de Voz</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Profissional e amigável" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Descreva a função e objetivo do agente..."
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="persona"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Persona</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Defina o papel, personalidade e estilo do agente..."
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Descreva como o agente deve se comportar e se apresentar
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="behavioral_guidelines"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diretrizes de Comportamento</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Defina regras específicas de comportamento, limitações e diretrizes..."
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Estabeleça regras claras sobre como o agente deve agir
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="credentials_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Credenciais</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={credentialsLoading}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione as credenciais" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {credentials.map((credential) => (
                            <SelectItem key={credential.id} value={credential.id}>
                              {credential.name} ({credential.provider})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0 pt-6">
                      <FormControl>
                        <Checkbox
                          checked={field.value === 'active'}
                          onCheckedChange={(checked) => field.onChange(checked ? 'active' : 'inactive')}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Ativar agente imediatamente
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={createAgent.isPending}>
                  {createAgent.isPending ? 'Criando...' : 'Criar Agente'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateAgentPage;
