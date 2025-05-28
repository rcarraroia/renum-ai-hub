import { useCallback, useRef, useState } from "react";

type CopyToClipboardState = {
  copied: boolean;
  text: string | null;
};

export function useCopyToClipboard() {
  const [state, setState] = useState<CopyToClipboardState>({
    copied: false,
    text: null,
  });
  
  const timeoutRef = useRef<number | null>(null);

  const copyToClipboard = useCallback(async (text: string) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard não disponível");
      return false;
    }

    // Limpar timeout anterior se existir
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    try {
      await navigator.clipboard.writeText(text);
      setState({ copied: true, text });
      
      // Resetar o estado após 2 segundos
      timeoutRef.current = window.setTimeout(() => {
        setState((prev) => ({ ...prev, copied: false }));
        timeoutRef.current = null;
      }, 2000);
      
      return true;
    } catch (error) {
      console.error("Falha ao copiar texto:", error);
      setState({ copied: false, text: null });
      return false;
    }
  }, []);

  return { ...state, copyToClipboard };
}
