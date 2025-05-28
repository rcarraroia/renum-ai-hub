import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Copy, 
  Download, 
  Mail, 
  MessageSquare, 
  MoreVertical, 
  Pencil, 
  Share2, 
  Star, 
  StarOff 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Tipos
export interface Content {
  id: string;
  title: string;
  content: string;
  type: "email" | "social_post" | "article" | "other";
  platform?: string;
  tone?: string;
  audience?: string;
  isFavorite?: boolean;
  createdAt: string;
}

interface ContentListProps {
  contents: Content[];
  onContentSelect: (content: Content) => void;
  onContentFavorite: (contentId: string, isFavorite: boolean) => void;
  onContentDelete: (contentId: string) => void;
  onCreateContent: () => void;
}

export function ContentList({
  contents,
  onContentSelect,
  onContentFavorite,
  onContentDelete,
  onCreateContent,
}: ContentListProps) {
  const [filter, setFilter] = useState<Content["type"] | "all">("all");

  const filteredContents = filter === "all" 
    ? contents 
    : contents.filter(content => content.type === filter);

  const getTypeIcon = (type: Content["type"]) => {
    switch (type) {
      case "email": return <Mail className="h-4 w-4" />;
      case "social_post": return <MessageSquare className="h-4 w-4" />;
      case "article": return <Pencil className="h-4 w-4" />;
      default: return <Pencil className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: Content["type"]) => {
    switch (type) {
      case "email": return "E-mail";
      case "social_post": return "Post";
      case "article": return "Artigo";
      default: return "Outro";
    }
  };

  const getPlatformLabel = (platform?: string) => {
    if (!platform) return null;
    return (
      <Badge variant="outline" className="ml-2">
        {platform}
      </Badge>
    );
  };

  const getToneLabel = (tone?: string) => {
    if (!tone) return null;
    return (
      <Badge variant="outline" className="ml-2">
        {tone}
      </Badge>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Conteúdos</CardTitle>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {filter === "all" ? "Todos os tipos" : getTypeLabel(filter)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilter("all")}>
                Todos os tipos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("email")}>
                E-mails
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("social_post")}>
                Posts
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("article")}>
                Artigos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("other")}>
                Outros
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" onClick={onCreateContent}>
            Novo Conteúdo
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredContents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum conteúdo encontrado
            </div>
          ) : (
            filteredContents.map((content) => (
              <div
                key={content.id}
                className="flex flex-col p-4 border rounded-lg hover:bg-accent/10 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center">
                    <div className="mr-2">
                      {getTypeIcon(content.type)}
                    </div>
                    <h3 className="font-medium">
                      {content.title}
                    </h3>
                    {getPlatformLabel(content.platform)}
                    {getToneLabel(content.tone)}
                  </div>
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onContentFavorite(content.id, !content.isFavorite)}
                      className="text-muted-foreground hover:text-primary"
                    >
                      {content.isFavorite ? (
                        <Star className="h-4 w-4 fill-primary text-primary" />
                      ) : (
                        <StarOff className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {content.isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                      </span>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Ações</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onContentSelect(content)}>
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(content.content)}>
                          <Copy className="h-4 w-4 mr-2" />
                          Copiar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="h-4 w-4 mr-2" />
                          Compartilhar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Exportar
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive focus:text-destructive"
                          onClick={() => onContentDelete(content.id)}
                        >
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                  {content.content.substring(0, 150)}...
                </p>
                <div className="flex justify-between items-center text-xs text-muted-foreground mt-2">
                  <div>
                    {content.audience && `Público: ${content.audience}`}
                  </div>
                  <div>
                    {new Date(content.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
