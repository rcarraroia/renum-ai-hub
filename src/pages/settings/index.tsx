
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  Key, 
  Github, 
  Database, 
  User, 
  Bell,
  Shield,
  Zap
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Configurações</h1>
        <p className="text-gray-500 mt-2">Gerencie suas configurações da plataforma e integrações</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="apis">APIs & Integrações</TabsTrigger>
          <TabsTrigger value="github">GitHub</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Perfil do Usuário
              </CardTitle>
              <CardDescription>
                Atualize suas informações pessoais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Nome</Label>
                  <Input id="firstName" placeholder="Seu nome" />
                </div>
                <div>
                  <Label htmlFor="lastName">Sobrenome</Label>
                  <Input id="lastName" placeholder="Seu sobrenome" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="seu@email.com" />
              </div>
              <Button>Salvar Alterações</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="apis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Chaves de API - Modelos de IA
              </CardTitle>
              <CardDescription>
                Configure as integrações com modelos de IA externos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="openai">OpenAI API Key</Label>
                <Input id="openai" type="password" placeholder="sk-..." />
              </div>
              <div>
                <Label htmlFor="gemini">Google Gemini API Key</Label>
                <Input id="gemini" type="password" placeholder="AIza..." />
              </div>
              <div>
                <Label htmlFor="claude">Anthropic Claude API Key</Label>
                <Input id="claude" type="password" placeholder="sk-ant-..." />
              </div>
              <Button className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Testar Conexões
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Configurações do Supabase
              </CardTitle>
              <CardDescription>
                Configurações de banco de dados e autenticação
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="supabaseUrl">Supabase URL</Label>
                <Input id="supabaseUrl" placeholder="https://xxx.supabase.co" />
              </div>
              <div>
                <Label htmlFor="supabaseKey">Supabase Anon Key</Label>
                <Input id="supabaseKey" type="password" placeholder="eyJ..." />
              </div>
              <Button>Salvar Configurações</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="github" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Github className="h-5 w-5" />
                Integração GitHub
              </CardTitle>
              <CardDescription>
                Configure a integração com GitHub para controle de versão
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="githubToken">GitHub Personal Access Token</Label>
                <Input id="githubToken" type="password" placeholder="ghp_..." />
              </div>
              <div>
                <Label htmlFor="defaultOrg">Organização Padrão</Label>
                <Input id="defaultOrg" placeholder="minha-organizacao" />
              </div>
              <div className="flex gap-2">
                <Button>Conectar GitHub</Button>
                <Button variant="outline">Testar Conexão</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Segurança da Conta
              </CardTitle>
              <CardDescription>
                Gerencie a segurança da sua conta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Senha Atual</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div>
                <Label htmlFor="newPassword">Nova Senha</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <Button>Alterar Senha</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Preferências de Notificação
              </CardTitle>
              <CardDescription>
                Configure como você deseja receber notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Notificações por Email</Label>
                    <p className="text-sm text-gray-500">Receber atualizações importantes por email</p>
                  </div>
                  <Button variant="outline" size="sm">Ativar</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Conclusão de Execuções</Label>
                    <p className="text-sm text-gray-500">Notificar quando agentes completarem tarefas</p>
                  </div>
                  <Button variant="outline" size="sm">Ativar</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Erros de Sistema</Label>
                    <p className="text-sm text-gray-500">Alertas sobre falhas ou problemas</p>
                  </div>
                  <Button variant="outline" size="sm">Ativar</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
