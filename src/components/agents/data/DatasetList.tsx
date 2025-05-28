import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Trash, BarChart, PieChart, LineChart, Table } from 'lucide-react';

interface DatasetListProps {
  datasets: any[];
  onView: (id: string) => void;
  onExport: (id: string) => void;
  onDelete: (id: string) => void;
}

export function DatasetList({ datasets, onView, onExport, onDelete }: DatasetListProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'sales':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'financial':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'marketing':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'operations':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'table':
        return <Table className='h-4 w-4 mr-1' />;
      case 'bar':
        return <BarChart className='h-4 w-4 mr-1' />;
      case 'pie':
        return <PieChart className='h-4 w-4 mr-1' />;
      case 'line':
        return <LineChart className='h-4 w-4 mr-1' />;
      default:
        return <Table className='h-4 w-4 mr-1' />;
    }
  };

  if (datasets.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center p-8 text-center'>
        <div className='rounded-full bg-muted p-3'>
          <BarChart className='h-6 w-6' />
        </div>
        <h3 className='mt-4 text-lg font-semibold'>Nenhum dataset encontrado</h3>
        <p className='mt-2 text-sm text-muted-foreground'>
          Comece criando uma nova análise ou importando dados.
        </p>
      </div>
    );
  }

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {datasets.map((dataset) => (
        <Card key={dataset.id} className='overflow-hidden'>
          <CardHeader className='pb-2'>
            <div className='flex justify-between'>
              <CardTitle className='line-clamp-1 text-base'>{dataset.title}</CardTitle>
              <Badge className={getTypeColor(dataset.type)}>
                {dataset.type.charAt(0).toUpperCase() + dataset.type.slice(1)}
              </Badge>
            </div>
            <CardDescription className='line-clamp-2'>{dataset.description}</CardDescription>
          </CardHeader>
          <CardContent className='pb-2'>
            <div className='flex flex-wrap gap-2 mb-2'>
              {dataset.format && (
                <Badge variant='outline' className='flex items-center'>
                  {getFormatIcon(dataset.format)}
                  {dataset.format.charAt(0).toUpperCase() + dataset.format.slice(1)}
                </Badge>
              )}
              {dataset.rows && (
                <Badge variant='outline'>
                  {dataset.rows} linhas
                </Badge>
              )}
              {dataset.columns && (
                <Badge variant='outline'>
                  {dataset.columns} colunas
                </Badge>
              )}
            </div>
            <div className='mt-2 line-clamp-3 text-sm text-muted-foreground'>
              {dataset.preview || 'Sem prévia disponível'}
            </div>
          </CardContent>
          <CardFooter className='flex justify-between pt-2'>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => onView(dataset.id)}
            >
              Visualizar
            </Button>
            <div className='flex space-x-2'>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => onExport(dataset.id)}
              >
                <Download className='h-4 w-4' />
              </Button>
              <Button
                variant='ghost'
                size='sm'
                className='text-red-600 hover:text-red-700 hover:bg-red-100'
                onClick={() => onDelete(dataset.id)}
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
