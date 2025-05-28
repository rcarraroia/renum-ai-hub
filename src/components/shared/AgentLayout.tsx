import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AgentLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  tabs?: {
    id: string;
    label: string;
    content: ReactNode;
  }[];
  defaultTab?: string;
}

export function AgentLayout({
  title,
  description,
  children,
  tabs,
  defaultTab,
}: AgentLayoutProps) {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      {tabs ? (
        <Tabs defaultValue={defaultTab || tabs[0].id} className="w-full">
          <TabsList className="mb-4">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id}>
              <Card>
                <CardContent className="p-6">{tab.content}</CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <Card>
          <CardContent className="p-6">{children}</CardContent>
        </Card>
      )}
    </div>
  );
}
