import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Calendar, 
  Clock, 
  Edit, 
  Filter, 
  MoreVertical, 
  Plus, 
  Trash2 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Tipos
export interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  priority: "low" | "medium" | "high";
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface TaskListProps {
  tasks: Task[];
  onTaskSelect: (task: Task) => void;
  onTaskStatusChange: (taskId: string, status: Task["status"]) => void;
  onTaskDelete: (taskId: string) => void;
  onCreateTask: () => void;
}

export function TaskList({
  tasks,
  onTaskSelect,
  onTaskStatusChange,
  onTaskDelete,
  onCreateTask,
}: TaskListProps) {
  const [filter, setFilter] = useState<Task["status"] | "all">("all");

  const filteredTasks = filter === "all" 
    ? tasks 
    : tasks.filter(task => task.status === filter);

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "in_progress": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "completed": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "cancelled": return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "low": return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      case "medium": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "high": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    }
  };

  const getStatusLabel = (status: Task["status"]) => {
    switch (status) {
      case "pending": return "Pendente";
      case "in_progress": return "Em Progresso";
      case "completed": return "Concluída";
      case "cancelled": return "Cancelada";
    }
  };

  const getPriorityLabel = (priority: Task["priority"]) => {
    switch (priority) {
      case "low": return "Baixa";
      case "medium": return "Média";
      case "high": return "Alta";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Tarefas</CardTitle>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                {filter === "all" ? "Todas" : getStatusLabel(filter)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilter("all")}>
                Todas
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("pending")}>
                Pendentes
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("in_progress")}>
                Em Progresso
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("completed")}>
                Concluídas
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("cancelled")}>
                Canceladas
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" onClick={onCreateTask}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Tarefa
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Nenhuma tarefa encontrada
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start gap-4 p-4 border rounded-lg hover:bg-accent/10 transition-colors"
              >
                <Checkbox
                  checked={task.status === "completed"}
                  onCheckedChange={(checked) => {
                    onTaskStatusChange(
                      task.id,
                      checked ? "completed" : "pending"
                    );
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 
                      className={`font-medium truncate ${
                        task.status === "completed" ? "line-through text-muted-foreground" : ""
                      }`}
                    >
                      {task.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {task.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <Badge className={getStatusColor(task.status)}>
                      {getStatusLabel(task.status)}
                    </Badge>
                    <Badge className={getPriorityColor(task.priority)}>
                      {getPriorityLabel(task.priority)}
                    </Badge>
                    {task.dueDate && (
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                    )}
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {new Date(task.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Ações</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onTaskSelect(task)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-destructive focus:text-destructive"
                      onClick={() => onTaskDelete(task.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
