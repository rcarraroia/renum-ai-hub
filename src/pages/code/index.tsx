import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCodeSupport } from '@/hooks/agents/useCodeSupport';
import { CodeProjectList } from '@/components/agents/code/CodeProjectList';
import { CodeProjectForm } from '@/components/agents/code/CodeProjectForm';
import { Button } from '@/components/ui/button';
import { PlusCircle, Code, MessageSquare, FolderTree } from 'lucide-react';
import { AgentLayout } from '@/components/shared/AgentLayout';
import { PromptInput } from '@/components/shared/PromptInput';
import { ResponseDisplay } from '@/components/shared/ResponseDisplay';

export default function CodeSupportPage() {
  const [activeTab, setActiveTab] = useState('projects');
  const [isCreating, setIsCreating] = useState(false);
  const [viewingProject, setViewingProject] = useState<any>(null);
  const { 
    projects, 
    loading, 
    sendPrompt, 
    promptResponse, 
    isProcessing,
    createProject,
    viewProject,
    exportProject,
    deleteProject
  } = useCodeSupport();

  // Resetar estado ao mudar de aba
  useEffect(() => {
    setIsCreating(false);
    setViewingProject(null);
  }, [activeTab]);

  const handleCreateProject = async (projectData: any) => {
    await createProject(projectData);
    setIsCreating(false);
  };

  const handleViewProject = async (id: string) => {
    const project = await viewProject(id);
    setViewingProject(project);
  };

  const handleExportProject = async (id: string) => {
    await exportProject(id);
  };

  const handleDeleteProject = async (id: string) => {
    await deleteProject(id);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setViewingProject(null);
  };

  const renderProjectContent = () => {
    if (isCreating) {
      return (
        <div className='container mx-auto py-6'>
          <h2 className='text-2xl font-bold mb-6'>Novo Projeto</h2>
          <CodeProjectForm 
            onSubmit={handleCreateProject}
            onCancel={handleCancel}
          />
        </div>
      );
    }

    if (viewingProject) {
      return (
        <div className='container mx-auto py-6'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-2xl font-bold'>{viewingProject.title}</h2>
            <Button variant='outline' onClick={handleCancel}>
              Voltar
            </Button>
          </div>
          
          <div className='grid gap-6'>
            <div className='p-4 border rounded-md'>
              <h3 className='text-lg font-medium mb-2'>Informações</h3>
              <div className='grid grid-cols-2 gap-4 text-sm'>
                <div>
                  <span className='font-medium'>Linguagem:</span> {viewingProject.language}
                </div>
                <div>
                  <span className='font-medium'>Tipo:</span> {viewingProject.type}
                </div>
                <div>
                  <span className='font-medium'>Arquivos:</span> {viewingProject.files || 'N/A'}
                </div>
                <div>
                  <span className='font-medium'>Linhas de código:</span> {viewingProject.loc || 'N/A'}
                </div>
              </div>
            </div>
            
            <div className='p-4 border rounded-md'>
              <h3 className='text-lg font-medium mb-2'>Estrutura de Arquivos</h3>
              <div className='p-4 bg-muted/50 rounded-md font-mono text-sm whitespace-pre overflow-x-auto'>
                {viewingProject.structure || 'Estrutura não disponível'}
              </div>
            </div>
            
            <div className='p-4 border rounded-md'>
              <h3 className='text-lg font-medium mb-2'>Código</h3>
              <div className='p-4 bg-muted/50 rounded-md font-mono text-sm whitespace-pre overflow-x-auto'>
                {viewingProject.code || 'Código não disponível'}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className='container mx-auto py-6'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold'>Meus Projetos</h2>
          <Button onClick={() => setIsCreating(true)}>
            <PlusCircle className='h-4 w-4 mr-2' />
            Novo Projeto
          </Button>
        </div>
        <CodeProjectList 
          projects={projects} 
          onView={handleViewProject}
          onExport={handleExportProject}
          onDelete={handleDeleteProject}
        />
      </div>
    );
  };

  return (
    <AgentLayout
      title='CodeSupport'
      description='Suporte à programação inteligente'
      icon={<Code className='h-6 w-6' />}
    >
      <Tabs defaultValue='projects' value={activeTab} onValueChange={setActiveTab} className='w-full'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='projects'>
            <FolderTree className='h-4 w-4 mr-2' />
            Projetos
          </TabsTrigger>
          <TabsTrigger value='assistant'>
            <MessageSquare className='h-4 w-4 mr-2' />
            Assistente
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value='projects' className='py-4'>
          {renderProjectContent()}
        </TabsContent>
        
        <TabsContent value='assistant' className='py-4'>
          <div className='container mx-auto py-6'>
            <h2 className='text-2xl font-bold mb-6'>Assistente de Código</h2>
            <ResponseDisplay 
              response={promptResponse} 
              loading={isProcessing}
              placeholder='Envie um comando para o assistente de código'
            />
            <div className='mt-6'>
              <PromptInput 
                onSubmit={sendPrompt}
                isLoading={isProcessing}
                placeholder='Ex: Como implementar autenticação JWT em uma API Express?'
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </AgentLayout>
  );
}
