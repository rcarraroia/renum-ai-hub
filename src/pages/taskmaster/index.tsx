import { useState, useEffect } from "react";
import { useTaskMaster } from "@/hooks/agents/useTaskMaster";
import { AgentLayout } from "@/components/shared/AgentLayout";
import { PromptInput } from "@/components/shared/PromptInput";
import { ResponseDisplay } from "@/components/shared/ResponseDisplay";
import { TaskList, Task } from "@/components/agents/taskmaster/TaskList";
import { TaskForm } from "@/components/agents/taskmaster/TaskForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { taskmasterApi } from "@/lib/api/agents";
import { useToast } from "@/components/ui/use-toast";

export default function TaskMasterPage() {
  const { isLoading: isPromptLoading, error, responses, sendPrompt } = useTaskMaster();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isTasksLoading, setIsTasksLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const { toast } = useToast();

  // Carregar tarefas ao montar o componente
  useEffect(() => {
    fetchTasks();
  }, []);

  // Buscar tarefas da API
  const fetchTasks = async () => {
    setIsTasksLoading(true);
    try {
      // Em ambiente de desenvolvimento, usar dados simulados
      if (import.meta.env.DEV) {
        const mockTasks: Task[] = Array.from({ length: 5 }).map((_, index) => ({
          id: `task-${index + 1}`,
          title: `Tarefa de exemplo ${index + 1}`,
          description: `Esta é uma descrição detalhada da tarefa de exemplo ${index + 1}. Inclui informações sobre o que precisa ser feito.`,
          status: ["pending", "in_progress", "completed", "cancelled"][Math.floor(Math.random() * 4)] as Task["status"],
          priority: ["low", "medium", "high"][Math.floor(Math.random() * 3)] as Task["priority"],
          dueDate: index % 2 === 0 ? new Date(Date.now() + 86400000 * (index + 1)).toISOString() : undefined,
          createdAt: new Date(Date.now() - 86400000 * index).toISOString(),
          updatedAt: new Date(Date.now() - 43200000 * index).toISOString(),
        }));
        
        setTimeout(() => {
          setTasks(mockTasks);
          setIsTasksLoading(false);
        }, 1000);
        return;
      }
      
      // Em produção, buscar da API real
      const response = await taskmasterApi.getTasks();
      setTasks(response);
    } catch (err) {
      console.error("Erro ao buscar tarefas:", err);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as tarefas. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsTasksLoading(false);
    }
  };

  // Manipular mudança de status da tarefa
  const handleTaskStatusChange = async (taskId: string, status: Task["status"]) => {
    try {
      // Atualizar localmente para feedback imediato
      setTasks(prev => 
        prev.map(task => 
          task.id === taskId ? { ...task, status, updatedAt: new Date().toISOString() } : task
        )
      );
      
      // Em produção, atualizar na API
      if (!import.meta.env.DEV) {
        await taskmasterApi.updateTask(taskId, { status });
      }
      
      toast({
        title: "Sucesso",
        description: "Status da tarefa atualizado com sucesso.",
      });
    } catch (err) {
      console.error("Erro ao atualizar status da tarefa:", err);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o status da tarefa.",
        variant: "destructive",
      });
      
      // Reverter mudança local em caso de erro
      fetchTasks();
    }
  };

  // Manipular exclusão de tarefa
  const handleTaskDelete = async (taskId: string) => {
    try {
      // Atualizar localmente para feedback imediato
      setTasks(prev => prev.filter(task => task.id !== taskId));
      
      // Em produção, excluir na API
      if (!import.meta.env.DEV) {
        await taskmasterApi.deleteTask(taskId);
      }
      
      toast({
        title: "Sucesso",
        description: "Tarefa excluída com sucesso.",
      });
    } catch (err) {
      console.error("Erro ao excluir tarefa:", err);
      toast({
        title: "Erro",
        description: "Não foi possível excluir a tarefa.",
        variant: "destructive",
      });
      
      // Reverter mudança local em caso de erro
      fetchTasks();
    }
  };

  // Manipular seleção de tarefa para edição
  const handleTaskSelect = (task: Task) => {
    setSelectedTask(task);
    setIsFormOpen(true);
  };

  // Manipular criação de nova tarefa
  const handleCreateTask = () => {
    setSelectedTask(undefined);
    setIsFormOpen(true);
  };

  // Manipular envio do formulário
  const handleFormSubmit = async (values: any) => {
    setIsFormSubmitting(true);
    try {
      if (selectedTask) {
        // Atualizar tarefa existente
        const updatedTask = {
          ...selectedTask,
          ...values,
          dueDate: values.dueDate?.toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        // Atualizar localmente para feedback imediato
        setTasks(prev => 
          prev.map(task => 
            task.id === selectedTask.id ? updatedTask : task
          )
        );
        
        // Em produção, atualizar na API
        if (!import.meta.env.DEV) {
          await taskmasterApi.updateTask(selectedTask.id, updatedTask);
        }
        
        toast({
          title: "Sucesso",
          description: "Tarefa atualizada com sucesso.",
        });
      } else {
        // Criar nova tarefa
        const newTask: Task = {
          id: `task-${Date.now()}`, // Em produção, o ID seria gerado pelo backend
          ...values,
          dueDate: values.dueDate?.toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        // Atualizar localmente para feedback imediato
        setTasks(prev => [newTask, ...prev]);
        
        // Em produção, criar na API
        if (!import.meta.env.DEV) {
          const response = await taskmasterApi.createTask(newTask);
          // Atualizar com o ID gerado pelo backend
          setTasks(prev => 
            prev.map(task => 
              task.id === newTask.id ? { ...task, id: response.id } : task
            )
          );
        }
        
        toast({
          title: "Sucesso",
          description: "Tarefa criada com sucesso.",
        });
      }
      
      // Fechar formulário após sucesso
      setIsFormOpen(false);
    } catch (err) {
      console.error("Erro ao salvar tarefa:", err);
      toast({
        title: "Erro",
        description: "Não foi possível salvar a tarefa.",
        variant: "destructive",
      });
    } finally {
      setIsFormSubmitting(false);
    }
  };

  return (
    <AgentLayout
      title="Gerenciador de Tarefas"
      description="Crie, organize e acompanhe suas tarefas com assistência inteligente"
    >
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="list">Lista de Tarefas</TabsTrigger>
          <TabsTrigger value="assistant">Assistente</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <div className="flex flex-col gap-6">
            <TaskList
              tasks={tasks}
              onTaskSelect={handleTaskSelect}
              onTaskStatusChange={handleTaskStatusChange}
              onTaskDelete={handleTaskDelete}
              onCreateTask={handleCreateTask}
            />
            
            <TaskForm
              open={isFormOpen}
              onOpenChange={setIsFormOpen}
              onSubmit={handleFormSubmit}
              initialData={selectedTask}
              isLoading={isFormSubmitting}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="assistant">
          <div className="flex flex-col gap-6">
            {error && (
              <div className="bg-destructive/15 text-destructive p-4 rounded-md">
                {error}
              </div>
            )}
            
            <PromptInput 
              onSubmit={sendPrompt}
              isLoading={isPromptLoading}
              placeholder="Descreva uma tarefa ou faça uma pergunta sobre gerenciamento de tarefas..."
            />
            
            {isPromptLoading && (
              <ResponseDisplay
                content=""
                isLoading={true}
                type="task"
              />
            )}
            
            <div className="flex flex-col gap-4">
              {responses.map(response => (
                <ResponseDisplay
                  key={response.id}
                  content={response.content}
                  timestamp={response.timestamp}
                  type={response.type}
                />
              ))}
              
              {responses.length === 0 && !isPromptLoading && (
                <div className="text-center py-8 text-muted-foreground">
                  Envie uma mensagem para começar a interagir com o Assistente de Tarefas
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </AgentLayout>
  );
}
