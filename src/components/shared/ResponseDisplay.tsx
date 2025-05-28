import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ResponseDisplayProps {
  content: ReactNode;
  timestamp?: string;
  type?: "text" | "code" | "data" | "task";
  title?: string;
  isLoading?: boolean;
}

export function ResponseDisplay({
  content,
  timestamp,
  type = "text",
  title,
  isLoading = false,
}: ResponseDisplayProps) {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {title && <CardTitle className="text-lg">{title}</CardTitle>}
            <Badge variant={getBadgeVariant(type)}>{getTypeLabel(type)}</Badge>
          </div>
          {timestamp && (
            <CardDescription className="text-xs">
              {timestamp}
            </CardDescription>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center p-4">
            <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-primary"></div>
            <span className="ml-2">Processando...</span>
          </div>
        ) : (
          <div className={`prose max-w-none dark:prose-invert ${type === "code" ? "font-mono" : ""}`}>
            {content}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function getBadgeVariant(type: string): "default" | "secondary" | "outline" | "destructive" {
  switch (type) {
    case "code":
      return "secondary";
    case "data":
      return "outline";
    case "task":
      return "destructive";
    default:
      return "default";
  }
}

function getTypeLabel(type: string): string {
  switch (type) {
    case "code":
      return "Código";
    case "data":
      return "Dados";
    case "task":
      return "Tarefa";
    default:
      return "Texto";
  }
}
