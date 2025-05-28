import { useCallback, useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const getMatches = useCallback((): boolean => {
    // Verificar se estamos no navegador
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  }, [query]);

  const [matches, setMatches] = useState<boolean>(getMatches());

  useEffect(() => {
    const handleChange = () => {
      setMatches(getMatches());
    };

    const matchMedia = window.matchMedia(query);

    // Inicializar com o valor atual
    handleChange();

    // Escutar por mudanças
    if (matchMedia.addListener) {
      // Para navegadores mais antigos
      matchMedia.addListener(handleChange);
    } else {
      // Para navegadores modernos
      matchMedia.addEventListener("change", handleChange);
    }

    return () => {
      if (matchMedia.removeListener) {
        // Para navegadores mais antigos
        matchMedia.removeListener(handleChange);
      } else {
        // Para navegadores modernos
        matchMedia.removeEventListener("change", handleChange);
      }
    };
  }, [getMatches, query]);

  return matches;
}
