
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Bot, Home, Settings, FolderOpen, Activity } from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
    active: true,
  },
  {
    title: "Meus Agentes",
    url: "#",
    icon: Bot,
  },
  {
    title: "Meus Projetos",
    url: "#",
    icon: FolderOpen,
  },
  {
    title: "Atividades",
    url: "#",
    icon: Activity,
  },
  {
    title: "Configurações",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-blue-100">
      <SidebarHeader className="border-b border-blue-100 p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Renum
            </h1>
            <p className="text-xs text-gray-500">Hub de Agentes IA</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 mb-2">Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={`w-full justify-start hover:bg-blue-50 hover:text-blue-700 transition-colors ${
                      item.active ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' : ''
                    }`}
                  >
                    <a href={item.url} className="flex items-center gap-3 px-3 py-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
