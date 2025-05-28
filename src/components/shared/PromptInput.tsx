import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  buttonText?: string;
}

export function PromptInput({
  onSubmit,
  isLoading = false,
  placeholder = "Digite sua mensagem aqui...",
  buttonText = "Enviar",
}: PromptInputProps) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt);
      setPrompt("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <Textarea
        placeholder={placeholder}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="min-h-24 resize-none"
      />
      <div className="flex justify-end">
        <Button type="submit" disabled={!prompt.trim() || isLoading}>
          {isLoading ? "Processando..." : buttonText}
        </Button>
      </div>
    </form>
  );
}
