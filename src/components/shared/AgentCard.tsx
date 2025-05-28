import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AgentCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  color?: "default" | "primary" | "secondary" | "accent";
}

export function AgentCard({ title, description, icon, to, color = "default" }: AgentCardProps) {
  const colorClasses = {
    default: "",
    primary: "border-primary",
    secondary: "border-secondary",
    accent: "border-green-500"
  };

  return (
    <Card className={`flex flex-col h-full transition-all hover:shadow-md ${colorClasses[color]}`}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="text-2xl">{icon}</div>
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {/* Conteúdo adicional pode ser adicionado aqui */}
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link to={to}>Acessar</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
