import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, AlertCircle, X, ArrowRight } from 'lucide-react';

interface TaskListProps {
  tasks: any[];
  onStatusChange: (id: string, status: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskList({ tasks, onStatusChange, onEdit, onDelete }: TaskListProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className='h-4 w-4 text-green-500' />;
      case 'in-progress':
        return <Clock className='h-4 w-4 text-blue-500' />;
      case 'pending':
        return <Clock className='h-4 w-4 text-yellow-500' />;
      case 'cancelled':
        return <X className='h-4 w-4 text-red-500' />;
      default:
        return <AlertCircle className='h-4 w-4 text-gray-500' />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  if (tasks.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center p-8 text-center'>
        <div className='rounded-full bg-muted p-3'>
          <AlertCircle className='h-6 w-6' />
        </div>
        <h3 className='mt-4 text-lg font-semibold'>Nenhuma tarefa encontrada</h3>
        <p className='mt-2 text-sm text-muted-foreground'>
          Comece criando uma nova tarefa ou ajuste seus filtros.
        </p>
      </div>
    );
  }

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {tasks.map((task) => (
        <Card key={task.id} className='overflow-hidden'>
          <CardHeader className='pb-2'>
            <div className='flex justify-between'>
              <CardTitle className='line-clamp-1 text-base'>{task.title}</CardTitle>
              <Badge className={getPriorityColor(task.priority)}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </Badge>
            </div>
            <CardDescription className='line-clamp-2'>{task.description}</CardDescription>
          </CardHeader>
          <CardContent className='pb-2'>
            <div className='flex items-center space-x-2'>
              {getStatusIcon(task.status)}
              <span className='text-sm font-medium'>
                {task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}
              </span>
            </div>
            {task.dueDate && (
              <div className='mt-2 text-sm text-muted-foreground'>
                Vencimento: {new Date(task.dueDate).toLocaleDateString()}
              </div>
            )}
          </CardContent>
          <CardFooter className='flex justify-between pt-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => onEdit(task.id)}
            >
              Editar
            </Button>
            <div className='flex space-x-2'>
              {task.status !== 'completed' && (
                <Button
                  variant='ghost'
                  size='sm'
                  className='text-green-600 hover:text-green-700 hover:bg-green-100'
                  onClick={() => onStatusChange(task.id, 'completed')}
                >
                  <CheckCircle className='h-4 w-4 mr-1' />
                  Concluir
                </Button>
              )}
              <Button
                variant='ghost'
                size='sm'
                className='text-red-600 hover:text-red-700 hover:bg-red-100'
                onClick={() => onDelete(task.id)}
              >
                <X className='h-4 w-4 mr-1' />
                Excluir
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
