import { useCallback, useEffect, useState } from "react";

type DebounceOptions = {
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
};

export function useDebounce<T>(value: T, delay: number, options: DebounceOptions = {}) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const { leading = false, trailing = true, maxWait } = options;

  useEffect(() => {
    // Implementar o valor imediatamente se leading=true e não temos um timeout ativo
    if (leading) {
      setDebouncedValue(value);
    }

    // Configurar o timeout para atualizar o valor após o delay
    const timer = setTimeout(() => {
      if (trailing) {
        setDebouncedValue(value);
      }
    }, delay);

    // Se maxWait for definido, garantir que o valor seja atualizado após esse tempo
    let maxTimer: number | undefined;
    if (maxWait !== undefined) {
      maxTimer = window.setTimeout(() => {
        setDebouncedValue(value);
      }, maxWait);
    }

    // Limpar os timers ao desmontar ou quando o valor mudar
    return () => {
      clearTimeout(timer);
      if (maxTimer) {
        clearTimeout(maxTimer);
      }
    };
  }, [value, delay, leading, trailing, maxWait]);

  return debouncedValue;
}
