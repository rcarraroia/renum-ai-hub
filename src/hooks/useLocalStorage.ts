import { useCallback, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Função para obter o valor inicial do localStorage ou usar o valor padrão
  const readValue = useCallback((): T => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Erro ao ler localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  // Estado para armazenar o valor atual
  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Função para atualizar o valor no localStorage e no estado
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      if (typeof window === "undefined") {
        console.warn(
          `Tentativa de definir localStorage key "${key}" fora do navegador`
        );
      }

      try {
        // Permitir que o valor seja uma função para seguir o mesmo padrão do useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        
        // Salvar no estado
        setStoredValue(valueToStore);
        
        // Salvar no localStorage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        
        // Disparar evento para outros componentes que possam estar usando o mesmo valor
        window.dispatchEvent(new Event("local-storage"));
      } catch (error) {
        console.warn(`Erro ao definir localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue] as const;
}
