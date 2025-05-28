import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Trash, Code, FileCode, FolderTree } from 'lucide-react';

interface CodeProjectListProps {
  projects: any[];
  onView: (id: string) => void;
  onExport: (id: string) => void;
  onDelete: (id: string) => void;
}

export function CodeProjectList({ projects, onView, onExport, onDelete }: CodeProjectListProps) {
  const getLanguageColor = (language: string) => {
    switch (language.toLowerCase()) {
      case 'javascript':
      case 'js':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'typescript':
      case 'ts':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'python':
      case 'py':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'java':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      case 'c#':
      case 'csharp':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'php':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
      case 'ruby':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'go':
        return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300';
      case 'rust':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'component':
        return <FileCode className='h-4 w-4 mr-1' />;
      case 'utility':
        return <Code className='h-4 w-4 mr-1' />;
      case 'test':
        return <Code className='h-4 w-4 mr-1' />;
      case 'boilerplate':
        return <FolderTree className='h-4 w-4 mr-1' />;
      default:
        return <FileCode className='h-4 w-4 mr-1' />;
    }
  };

  if (projects.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center p-8 text-center'>
        <div className='rounded-full bg-muted p-3'>
          <Code className='h-6 w-6' />
        </div>
        <h3 className='mt-4 text-lg font-semibold'>Nenhum projeto encontrado</h3>
        <p className='mt-2 text-sm text-muted-foreground'>
          Comece criando um novo projeto ou importando código existente.
        </p>
      </div>
    );
  }

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {projects.map((project) => (
        <Card key={project.id} className='overflow-hidden'>
          <CardHeader className='pb-2'>
            <div className='flex justify-between'>
              <CardTitle className='line-clamp-1 text-base'>{project.title}</CardTitle>
              <Badge className={getLanguageColor(project.language)}>
                {project.language}
              </Badge>
            </div>
            <CardDescription className='line-clamp-2'>{project.description}</CardDescription>
          </CardHeader>
          <CardContent className='pb-2'>
            <div className='flex flex-wrap gap-2 mb-2'>
              {project.type && (
                <Badge variant='outline' className='flex items-center'>
                  {getTypeIcon(project.type)}
                  {project.type}
                </Badge>
              )}
              {project.files && (
                <Badge variant='outline'>
                  {project.files} arquivos
                </Badge>
              )}
              {project.loc && (
                <Badge variant='outline'>
                  {project.loc} linhas
                </Badge>
              )}
            </div>
            <div className='mt-2 line-clamp-3 text-sm text-muted-foreground'>
              {project.preview || 'Sem prévia disponível'}
            </div>
          </CardContent>
          <CardFooter className='flex justify-between pt-2'>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => onView(project.id)}
            >
              Visualizar
            </Button>
            <div className='flex space-x-2'>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => onExport(project.id)}
              >
                <Download className='h-4 w-4' />
              </Button>
              <Button
                variant='ghost'
                size='sm'
                className='text-red-600 hover:text-red-700 hover:bg-red-100'
                onClick={() => onDelete(project.id)}
              >
                <Trash className='h-4 w-4' />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
