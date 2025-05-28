import { useCallback, useEffect, useState } from "react";

export function useKeyPress(targetKey: string) {
  // Estado para rastrear se a tecla está pressionada
  const [keyPressed, setKeyPressed] = useState(false);

  // Função para lidar com o evento keydown
  const downHandler = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    },
    [targetKey]
  );

  // Função para lidar com o evento keyup
  const upHandler = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    },
    [targetKey]
  );

  // Adicionar e remover os event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    // Limpar os event listeners
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [downHandler, upHandler]);

  return keyPressed;
}
