import { useCallback, useState } from "react";
import { dataAnalystApi } from "@/lib/api/agents";

export function useDataAnalyst() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [responses, setResponses] = useState<Array<{
    id: string;
    content: string;
    timestamp: string;
    type: "text" | "data";
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
              content: `Análise de dados para: "${prompt}"`,
              timestamp: new Date().toLocaleTimeString(),
              type: Math.random() > 0.5 ? "text" : "data" as "text" | "data",
            };
            
            setResponses(prev => [newResponse, ...prev]);
            setIsLoading(false);
            resolve();
          }, 1500);
        });
      }
      
      // Em produção, chamar API real
      const response = await dataAnalystApi.sendPrompt(prompt);
      
      const newResponse = {
        id: response.id || Date.now().toString(),
        content: response.content,
        timestamp: new Date().toLocaleTimeString(),
        type: response.type || "data",
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
