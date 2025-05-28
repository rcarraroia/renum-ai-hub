import { useState, useEffect } from "react";
import { useContentCreator } from "@/hooks/agents/useContentCreator";
import { AgentLayout } from "@/components/shared/AgentLayout";
import { PromptInput } from "@/components/shared/PromptInput";
import { ResponseDisplay } from "@/components/shared/ResponseDisplay";
import { ContentList, Content } from "@/components/agents/content/ContentList";
import { ContentForm } from "@/components/agents/content/ContentForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { contentCreatorApi } from "@/lib/api/agents";
import { useToast } from "@/components/ui/use-toast";

export default function ContentCreatorPage() {
  const { isLoading: isPromptLoading, error, responses, sendPrompt } = useContentCreator();
  const [contents, setContents] = useState<Content[]>([]);
  const [isContentsLoading, setIsContentsLoading] = useState(false);
  const [selectedContent, setSelectedContent] = useState<Content | undefined>(undefined);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const { toast } = useToast();

  // Carregar conteúdos ao montar o componente
  useEffect(() => {
    fetchContents();
  }, []);

  // Buscar conteúdos da API
  const fetchContents = async () => {
    setIsContentsLoading(true);
    try {
      // Em ambiente de desenvolvimento, usar dados simulados
      if (import.meta.env.DEV) {
        const mockContents: Content[] = [
          {
            id: "content-1",
            title: "E-mail de boas-vindas",
            content: "Olá [Nome],\n\nÉ com grande prazer que damos as boas-vindas à nossa plataforma! Estamos muito felizes por você ter se juntado a nós.\n\nAqui você encontrará todas as ferramentas necessárias para impulsionar seus projetos e alcançar seus objetivos. Nossa equipe está à disposição para ajudar em qualquer dúvida ou necessidade.\n\nPara começar, recomendamos que explore nosso tutorial inicial e personalize seu perfil.\n\nAtenciosamente,\nEquipe de Suporte",
            type: "email",
            platform: "gmail",
            tone: "professional",
            audience: "Novos usuários",
            isFavorite: true,
            createdAt: new Date(Date.now() - 86400000).toISOString(),
          },
          {
            id: "content-2",
            title: "Post sobre IA Generativa",
            content: "🚀 A revolução da IA Generativa está transformando o mundo dos negócios!\n\nCom ferramentas como ChatGPT, DALL-E e Midjourney, empresas de todos os tamanhos estão:\n\n✅ Automatizando processos criativos\n✅ Personalizando comunicações em escala\n✅ Criando conteúdo visual único\n\nComo sua empresa está aproveitando essa tecnologia? Compartilhe nos comentários! 👇\n\n#InteligênciaArtificial #Inovação #Tecnologia",
            type: "social_post",
            platform: "linkedin",
            tone: "enthusiastic",
            audience: "Profissionais de tecnologia",
            isFavorite: false,
            createdAt: new Date(Date.now() - 172800000).toISOString(),
          },
          {
            id: "content-3",
            title: "Artigo sobre Produtividade",
            content: "# 5 Técnicas Comprovadas para Aumentar sua Produtividade\n\nNo mundo acelerado de hoje, maximizar a produtividade tornou-se essencial para profissionais de todas as áreas. Este artigo explora cinco técnicas baseadas em evidências que podem transformar sua rotina de trabalho e ajudá-lo a alcançar mais com menos estresse.\n\n## 1. A Técnica Pomodoro\n\nDesenvolvida por Francesco Cirillo nos anos 1980, a técnica Pomodoro divide o trabalho em intervalos de 25 minutos, separados por pequenas pausas. Este método simples aproveita a psicologia do foco concentrado e descansos estratégicos para manter o cérebro funcionando em seu potencial máximo.\n\n## 2. Planejamento de Prioridades\n\nUtilizar métodos como a Matriz de Eisenhower ajuda a categorizar tarefas por importância e urgência, garantindo que você dedique tempo às atividades de alto impacto antes de tudo.\n\n## 3. Eliminação de Distrações Digitais\n\nAplicativos como Freedom e Forest podem bloquear sites e aplicativos que distraem, criando um ambiente digital mais propício ao foco profundo.\n\n## 4. Rotinas Matinais Estruturadas\n\nPessoas altamente produtivas frequentemente atribuem seu sucesso a rotinas matinais bem estabelecidas que preparam o corpo e a mente para um dia produtivo.\n\n## 5. Descanso Deliberado\n\nParadoxalmente, programar períodos de descanso completo é essencial para manter altos níveis de produtividade ao longo do tempo, evitando o esgotamento.",
            type: "article",
            platform: "blog",
            tone: "professional",
            audience: "Profissionais e estudantes",
            isFavorite: true,
            createdAt: new Date(Date.now() - 259200000).toISOString(),
          },
        ];
        
        setTimeout(() => {
          setContents(mockContents);
          setIsContentsLoading(false);
        }, 1000);
        return;
      }
      
      // Em produção, buscar da API real
      const response = await contentCreatorApi.getContents();
      setContents(response);
    } catch (err) {
      console.error("Erro ao buscar conteúdos:", err);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os conteúdos. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsContentsLoading(false);
    }
  };

  // Manipular favoritar/desfavoritar conteúdo
  const handleContentFavorite = async (contentId: string, isFavorite: boolean) => {
    try {
      // Atualizar localmente para feedback imediato
      setContents(prev => 
        prev.map(content => 
          content.id === contentId ? { ...content, isFavorite } : content
        )
      );
      
      // Em produção, atualizar na API
      if (!import.meta.env.DEV) {
        await contentCreatorApi.updateContent(contentId, { isFavorite });
      }
      
      toast({
        title: isFavorite ? "Adicionado aos favoritos" : "Removido dos favoritos",
        description: isFavorite 
          ? "Conteúdo adicionado aos favoritos com sucesso." 
          : "Conteúdo removido dos favoritos com sucesso.",
      });
    } catch (err) {
      console.error("Erro ao atualizar favorito:", err);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar os favoritos.",
        variant: "destructive",
      });
      
      // Reverter mudança local em caso de erro
      fetchContents();
    }
  };

  // Manipular exclusão de conteúdo
  const handleContentDelete = async (contentId: string) => {
    try {
      // Atualizar localmente para feedback imediato
      setContents(prev => prev.filter(content => content.id !== contentId));
      
      // Em produção, excluir na API
      if (!import.meta.env.DEV) {
        await contentCreatorApi.deleteContent(contentId);
      }
      
      toast({
        title: "Sucesso",
        description: "Conteúdo excluído com sucesso.",
      });
    } catch (err) {
      console.error("Erro ao excluir conteúdo:", err);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o conteúdo.",
        variant: "destructive",
      });
      
      // Reverter mudança local em caso de erro
      fetchContents();
    }
  };

  // Manipular seleção de conteúdo
  const handleContentSelect = (content: Content) => {
    setSelectedContent(content);
    // Aqui você pode implementar a visualização detalhada do conteúdo
    toast({
      title: content.title,
      description: "Conteúdo selecionado para visualização.",
    });
  };

  // Manipular criação de novo conteúdo
  const handleCreateContent = () => {
    setIsFormOpen(true);
  };

  // Manipular envio do formulário
  const handleFormSubmit = async (values: any) => {
    setIsFormSubmitting(true);
    try {
      // Enviar prompt para gerar conteúdo
      const prompt = `
        Tipo: ${values.type === "email" ? "E-mail" : values.type === "social_post" ? "Post para redes sociais" : values.type === "article" ? "Artigo" : "Outro"}
        Plataforma: ${values.platform || "N/A"}
        Tom: ${values.tone || "N/A"}
        Público-alvo: ${values.audience || "N/A"}
        
        ${values.prompt}
      `;
      
      // Em ambiente de desenvolvimento, simular resposta
      if (import.meta.env.DEV) {
        setTimeout(() => {
          const newContent: Content = {
            id: `content-${Date.now()}`,
            title: values.title,
            content: `Conteúdo gerado com base em: "${values.prompt}"`,
            type: values.type,
            platform: values.platform,
            tone: values.tone,
            audience: values.audience,
            isFavorite: false,
            createdAt: new Date().toISOString(),
          };
          
          setContents(prev => [newContent, ...prev]);
          setIsFormSubmitting(false);
          setIsFormOpen(false);
          
          toast({
            title: "Sucesso",
            description: "Conteúdo gerado com sucesso.",
          });
        }, 2000);
        return;
      }
      
      // Em produção, enviar para API
      await sendPrompt(prompt);
      
      // Após gerar o conteúdo, buscar conteúdos atualizados
      await fetchContents();
      
      setIsFormOpen(false);
      
      toast({
        title: "Sucesso",
        description: "Conteúdo gerado com sucesso.",
      });
    } catch (err) {
      console.error("Erro ao gerar conteúdo:", err);
      toast({
        title: "Erro",
        description: "Não foi possível gerar o conteúdo. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsFormSubmitting(false);
    }
  };

  return (
    <AgentLayout
      title="Criador de Conteúdo"
      description="Gere e-mails, posts e textos criativos para diversas plataformas"
    >
      <Tabs defaultValue="library" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="library">Biblioteca de Conteúdos</TabsTrigger>
          <TabsTrigger value="generator">Gerador de Conteúdo</TabsTrigger>
        </TabsList>
        
        <TabsContent value="library">
          <div className="flex flex-col gap-6">
            <ContentList
              contents={contents}
              onContentSelect={handleContentSelect}
              onContentFavorite={handleContentFavorite}
              onContentDelete={handleContentDelete}
              onCreateContent={handleCreateContent}
            />
            
            <ContentForm
              open={isFormOpen}
              onOpenChange={setIsFormOpen}
              onSubmit={handleFormSubmit}
              isLoading={isFormSubmitting}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="generator">
          <div className="flex flex-col gap-6">
            {error && (
              <div className="bg-destructive/15 text-destructive p-4 rounded-md">
                {error}
              </div>
            )}
            
            <PromptInput 
              onSubmit={sendPrompt}
              isLoading={isPromptLoading}
              placeholder="Descreva o conteúdo que deseja criar (e-mail, post, texto)..."
              buttonText="Gerar Conteúdo"
            />
            
            {isPromptLoading && (
              <ResponseDisplay
                content=""
                isLoading={true}
              />
            )}
            
            <div className="flex flex-col gap-4">
              {responses.map(response => (
                <ResponseDisplay
                  key={response.id}
                  content={response.content}
                  timestamp={response.timestamp}
                  title={response.title}
                />
              ))}
              
              {responses.length === 0 && !isPromptLoading && (
                <div className="text-center py-8 text-muted-foreground">
                  Envie uma mensagem para começar a gerar conteúdo criativo
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </AgentLayout>
  );
}
