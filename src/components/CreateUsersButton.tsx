
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, UserPlus } from 'lucide-react';

export function CreateUsersButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCreateUsers = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-users');
      
      if (error) {
        throw error;
      }

      toast({
        title: "Usuários criados com sucesso!",
        description: "Admin e colaborador foram criados no sistema.",
      });

      console.log('Resposta da função:', data);
    } catch (error) {
      console.error('Erro ao criar usuários:', error);
      toast({
        title: "Erro ao criar usuários",
        description: "Ocorreu um erro ao criar os usuários. Verifique os logs.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleCreateUsers}
      disabled={isLoading}
      className="gap-2"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Criando usuários...
        </>
      ) : (
        <>
          <UserPlus className="h-4 w-4" />
          Criar Usuários
        </>
      )}
    </Button>
  );
}
