import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useContentCreator } from '@/hooks/agents/useContentCreator';
import { ContentList } from '@/components/agents/content/ContentList';
import { ContentForm } from '@/components/agents/content/ContentForm';
import { Button } from '@/components/ui/button';
import { PlusCircle, FileText, MessageSquare, Library } from 'lucide-react';
import { AgentLayout } from '@/components/shared/AgentLayout';
import { PromptInput } from '@/components/shared/PromptInput';
import { ResponseDisplay } from '@/components/shared/ResponseDisplay';

export default function ContentCreatorPage() {
  const [activeTab, setActiveTab] = useState('library');
  const [isCreating, setIsCreating] = useState(false);
  const { 
    contents, 
    loading, 
    sendPrompt, 
    promptResponse, 
    isProcessing,
    createContent,
    favoriteContent,
    shareContent,
    copyContent,
    deleteContent
  } = useContentCreator();

  // Resetar estado de criação ao mudar de aba
  useEffect(() => {
    setIsCreating(false);
  }, [activeTab]);

  const handleCreateContent = async (contentData: any) => {
    await createContent(contentData);
    setIsCreating(false);
  };

  const handleFavorite = async (id: string) => {
    await favoriteContent(id);
  };

  const handleShare = async (id: string) => {
    await shareContent(id);
  };

  const handleCopy = async (id: string) => {
    await copyContent(id);
  };

  const handleDelete = async (id: string) => {
    await deleteContent(id);
  };

  const handleCancel = () => {
    setIsCreating(false);
  };

  const renderLibraryContent = () => {
    if (isCreating) {
      return (
        <div className='container mx-auto py-6'>
          <h2 className='text-2xl font-bold mb-6'>Novo Conteúdo</h2>
          <ContentForm 
            onSubmit={handleCreateContent}
            onCancel={handleCancel}
          />
        </div>
      );
    }

    return (
      <div className='container mx-auto py-6'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold'>Biblioteca de Conteúdos</h2>
          <Button onClick={() => setIsCreating(true)}>
            <PlusCircle className='h-4 w-4 mr-2' />
            Novo Conteúdo
          </Button>
        </div>
        <ContentList 
          contents={contents} 
          onFavorite={handleFavorite}
          onShare={handleShare}
          onCopy={handleCopy}
          onDelete={handleDelete}
        />
      </div>
    );
  };

  return (
    <AgentLayout
      title='ContentCreator'
      description='Gerador de conteúdo inteligente'
      icon={<FileText className='h-6 w-6' />}
    >
      <Tabs defaultValue='library' value={activeTab} onValueChange={setActiveTab} className='w-full'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='library'>
            <Library className='h-4 w-4 mr-2' />
            Biblioteca
          </TabsTrigger>
          <TabsTrigger value='generator'>
            <MessageSquare className='h-4 w-4 mr-2' />
            Gerador
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value='library' className='py-4'>
          {renderLibraryContent()}
        </TabsContent>
        
        <TabsContent value='generator' className='py-4'>
          <div className='container mx-auto py-6'>
            <h2 className='text-2xl font-bold mb-6'>Gerador de Conteúdo</h2>
            <ResponseDisplay 
              response={promptResponse} 
              loading={isProcessing}
              placeholder='Envie um comando para gerar conteúdo'
            />
            <div className='mt-6'>
              <PromptInput 
                onSubmit={sendPrompt}
                isLoading={isProcessing}
                placeholder='Ex: Crie um email de boas-vindas para novos clientes da nossa plataforma de marketing'
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </AgentLayout>
  );
}
