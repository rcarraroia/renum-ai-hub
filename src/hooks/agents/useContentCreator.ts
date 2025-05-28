import { useCallback, useState } from "react";
import { contentCreatorApi } from "@/lib/api/agents";

export function useContentCreator() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [responses, setResponses] = useState<Array<{
    id: string;
    content: string;
    timestamp: string;
    title?: string;
  }>>([]);

  const sendPrompt = useCallback(async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Em ambiente de desenvolvimento, simular resposta
      if (import.meta.env.DEV) {
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            const newResponse = {
              id: Date.now().toString(),
              content: `Aqui está o conteúdo gerado com base em: "${prompt}"`,
              timestamp: new Date().toLocaleTimeString(),
              title: prompt.length > 30 ? `${prompt.substring(0, 30)}...` : prompt
            };
            
            setResponses(prev => [newResponse, ...prev]);
            setIsLoading(false);
            resolve();
          }, 1500);
        });
      }
      
      // Em produção, chamar API real
      const response = await contentCreatorApi.sendPrompt(prompt);
      
      const newResponse = {
        id: response.id || Date.now().toString(),
        content: response.content,
        timestamp: new Date().toLocaleTimeString(),
        title: response.title || (prompt.length > 30 ? `${prompt.substring(0, 30)}...` : prompt)
      };
      
      setResponses(prev => [newResponse, ...prev]);
    } catch (err) {
      console.error("Erro ao processar prompt:", err);
      setError("Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    responses,
    sendPrompt,
  };
}
