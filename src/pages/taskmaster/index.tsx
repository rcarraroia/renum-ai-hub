import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTaskMaster } from '@/hooks/agents/useTaskMaster';
import { TaskList } from '@/components/agents/taskmaster/TaskList';
import { TaskForm } from '@/components/agents/taskmaster/TaskForm';
import { Button } from '@/components/ui/button';
import { PlusCircle, ListTodo, MessageSquare } from 'lucide-react';
import { AgentLayout } from '@/components/shared/AgentLayout';
import { PromptInput } from '@/components/shared/PromptInput';
import { ResponseDisplay } from '@/components/shared/ResponseDisplay';

export default function TaskMasterPage() {
  const [activeTab, setActiveTab] = useState('tasks');
  const [isCreating, setIsCreating] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  const { 
    tasks, 
    loading, 
    sendPrompt, 
    promptResponse, 
    isProcessing,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus
  } = useTaskMaster();

  // Resetar estado de edição ao mudar de aba
  useEffect(() => {
    setIsCreating(false);
    setEditingTask(null);
  }, [activeTab]);

  const handleCreateTask = async (taskData: any) => {
    await createTask(taskData);
    setIsCreating(false);
  };

  const handleUpdateTask = async (taskData: any) => {
    if (editingTask) {
      await updateTask(editingTask.id, taskData);
      setEditingTask(null);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    await updateTaskStatus(id, status);
  };

  const handleEdit = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      setEditingTask(task);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingTask(null);
  };

  const renderTasksContent = () => {
    if (isCreating) {
      return (
        <div className='container mx-auto py-6'>
          <h2 className='text-2xl font-bold mb-6'>Nova Tarefa</h2>
          <TaskForm 
            onSubmit={handleCreateTask}
            onCancel={handleCancel}
          />
        </div>
      );
    }

    if (editingTask) {
      return (
        <div className='container mx-auto py-6'>
          <h2 className='text-2xl font-bold mb-6'>Editar Tarefa</h2>
          <TaskForm 
            defaultValues={editingTask}
            onSubmit={handleUpdateTask}
            onCancel={handleCancel}
            isEdit
          />
        </div>
      );
    }

    return (
      <div className='container mx-auto py-6'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold'>Minhas Tarefas</h2>
          <Button onClick={() => setIsCreating(true)}>
            <PlusCircle className='h-4 w-4 mr-2' />
            Nova Tarefa
          </Button>
        </div>
        <TaskList 
          tasks={tasks} 
          onStatusChange={handleStatusChange}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    );
  };

  return (
    <AgentLayout
      title='RenumTaskMaster'
      description='Gerenciador de tarefas inteligente'
      icon={<ListTodo className='h-6 w-6' />}
    >
      <Tabs defaultValue='tasks' value={activeTab} onValueChange={setActiveTab} className='w-full'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='tasks'>
            <ListTodo className='h-4 w-4 mr-2' />
            Tarefas
          </TabsTrigger>
          <TabsTrigger value='assistant'>
            <MessageSquare className='h-4 w-4 mr-2' />
            Assistente
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value='tasks' className='py-4'>
          {renderTasksContent()}
        </TabsContent>
        
        <TabsContent value='assistant' className='py-4'>
          <div className='container mx-auto py-6'>
            <h2 className='text-2xl font-bold mb-6'>Assistente de Tarefas</h2>
            <ResponseDisplay 
              response={promptResponse} 
              loading={isProcessing}
              placeholder='Envie um comando para o assistente de tarefas'
            />
            <div className='mt-6'>
              <PromptInput 
                onSubmit={sendPrompt}
                isLoading={isProcessing}
                placeholder='Ex: Crie uma tarefa para revisar o relatório de vendas até sexta-feira'
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </AgentLayout>
  );
}
