
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

const EditAgentPage: React.FC = () => {
  const navigate = useNavigate();
  const { agentId } = useParams<{ agentId: string }>();
  const { toast } = useToast();
  const { projectId } = useProjectId();
  const { tools, knowledgeDocuments, credentials, updateAgent, getAgent, toolsLoading, documentsLoading, credentialsLoading } = useAgentBuilder(projectId);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const loadAgent = async () => {
      if (!agentId) return;
      
      try {
        const agent = await getAgent(agentId);
        if (agent) {
          form.reset({
            name: agent.name,
            description: agent.description,
            persona: agent.persona,
            tone_of_voice: agent.tone_of_voice,
            behavioral_guidelines: agent.behavioral_guidelines,
            tools: agent.tools || [],
            knowledge_documents: agent.knowledge_documents || [],
            credentials_id: agent.credentials_id || '',
            status: agent.status,
          });
        } else {
          toast({
            title: 'Agente não encontrado',
            description: 'O agente solicitado não foi encontrado.',
            variant: 'destructive',
          });
          navigate('/agent-builder');
        }
      } catch (error) {
        toast({
          title: 'Erro ao carregar agente',
          description: 'Ocorreu um erro ao carregar os dados do agente.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    loadAgent();
  }, [agentId, getAgent, form, navigate, toast]);

  const onSubmit = async (data: AgentFormData) => {
    if (!agentId) return;

    try {
      await updateAgent.mutateAsync({
        id: agentId,
        ...data,
      });
      
      toast({
        title: 'Agente atualizado com sucesso!',
        description: 'As alterações foram salvas.',
      });
      
      navigate('/agent-builder');
    } catch (error) {
      toast({
        title: 'Erro ao atualizar agente',
        description: 'Ocorreu um erro ao tentar salvar as alterações. Tente novamente.',
        variant: 'destructive',
      });
    }
  };

  const handleCancel = () => {
    navigate('/agent-builder');
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Carregando dados do agente...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-8">
        <Button variant="ghost" onClick={handleCancel} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Editar Agente</h1>
          <p className="text-gray-500 mt-2">Modifique as configurações do seu agente de IA</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configuração do Agente</CardTitle>
          <CardDescription>
            Atualize as características e comportamentos do seu agente de IA
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
                        Agente ativo
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={updateAgent.isPending}>
                  {updateAgent.isPending ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditAgentPage;
