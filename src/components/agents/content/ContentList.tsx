import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Share, Copy, Trash, Star } from 'lucide-react';

interface ContentListProps {
  contents: any[];
  onFavorite: (id: string) => void;
  onShare: (id: string) => void;
  onCopy: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ContentList({ contents, onFavorite, onShare, onCopy, onDelete }: ContentListProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'email':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'post':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'article':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  if (contents.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center p-8 text-center'>
        <div className='rounded-full bg-muted p-3'>
          <Star className='h-6 w-6' />
        </div>
        <h3 className='mt-4 text-lg font-semibold'>Nenhum conteúdo encontrado</h3>
        <p className='mt-2 text-sm text-muted-foreground'>
          Comece criando um novo conteúdo ou ajuste seus filtros.
        </p>
      </div>
    );
  }

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {contents.map((content) => (
        <Card key={content.id} className='overflow-hidden'>
          <CardHeader className='pb-2'>
            <div className='flex justify-between'>
              <CardTitle className='line-clamp-1 text-base'>{content.title}</CardTitle>
              <Badge className={getTypeColor(content.type)}>
                {content.type.charAt(0).toUpperCase() + content.type.slice(1)}
              </Badge>
            </div>
            <CardDescription className='line-clamp-2'>{content.description}</CardDescription>
          </CardHeader>
          <CardContent className='pb-2'>
            <div className='flex flex-wrap gap-2 mb-2'>
              {content.platform && (
                <Badge variant='outline'>
                  {content.platform}
                </Badge>
              )}
              {content.tone && (
                <Badge variant='outline'>
                  {content.tone}
                </Badge>
              )}
              {content.audience && (
                <Badge variant='outline'>
                  Público: {content.audience}
                </Badge>
              )}
            </div>
            <div className='mt-2 line-clamp-3 text-sm text-muted-foreground'>
              {content.preview || 'Sem prévia disponível'}
            </div>
          </CardContent>
          <CardFooter className='flex justify-between pt-2'>
            <Button
              variant='ghost'
              size='sm'
              className={content.favorite ? 'text-red-600' : ''}
              onClick={() => onFavorite(content.id)}
            >
              <Heart className='h-4 w-4 mr-1' fill={content.favorite ? 'currentColor' : 'none'} />
              {content.favorite ? 'Favorito' : 'Favoritar'}
            </Button>
            <div className='flex space-x-2'>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => onCopy(content.id)}
              >
                <Copy className='h-4 w-4' />
              </Button>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => onShare(content.id)}
              >
                <Share className='h-4 w-4' />
              </Button>
              <Button
                variant='ghost'
                size='sm'
                className='text-red-600 hover:text-red-700 hover:bg-red-100'
                onClick={() => onDelete(content.id)}
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
