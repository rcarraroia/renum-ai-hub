# Plano para Configuração do MCP Server Supabase

## Objetivo
Configurar o MCP server do Supabase conforme as regras fornecidas, incluindo:
- Criação do diretório para o MCP server.
- Configuração do arquivo `mcp_settings.json` com o servidor nomeado como `"github.com/supabase-community/supabase-mcp"`.
- Demonstração do uso de uma ferramenta do MCP server.

## Passos Detalhados

### 1. Criar Diretório para o MCP Server
- Criar um diretório no workspace para o MCP server, por exemplo:
  ```
  mcp_servers/github.com-supabase-community-supabase-mcp
  ```
- Este diretório pode ficar vazio, serve para organização.

### 2. Atualizar o arquivo `mcp_settings.json`
- Localização: `c:/Users/Rennum/AppData/Roaming/Code/User/globalStorage/kilocode.kilo-code/settings/mcp_settings.json`
- Adicionar a seguinte configuração dentro do objeto `"mcpServers"`:

```json
"github.com/supabase-community/supabase-mcp": {
  "command": "cmd",
  "args": [
    "/c",
    "npx",
    "-y",
    "@supabase/mcp-server-supabase@latest",
    "--access-token",
    "sbp_7e90d71803c2f14f15a34a9fe283a609e85428f7"
  ]
}
```

- Isso configura o MCP client para iniciar o servidor usando o token de acesso pessoal fornecido.

### 3. Demonstrar o uso do MCP Server
- Após a configuração, o MCP client pode iniciar o servidor.
- Para testar, pode-se usar a ferramenta `list_projects` para listar os projetos Supabase associados ao token.
- Exemplo de comando para testar (executar no terminal ou via MCP client):
  ```
  npx -y @supabase/mcp-server-supabase@latest --access-token=sbp_7e90d71803c2f14f15a34a9fe283a609e85428f7
  ```
- Ou usar um cliente MCP configurado para chamar a ferramenta `list_projects`.

## Observações
- No Windows, o comando deve ser prefixado com `cmd /c` conforme configurado.
- O token de acesso pessoal deve ser mantido seguro e não exposto em repositórios públicos.
- Caso prefira, o token pode ser configurado como variável de ambiente `SUPABASE_ACCESS_TOKEN` e omitido do arquivo JSON.

---

Após sua aprovação, posso implementar esses passos para você. Para isso, será necessário mudar para o modo "code" para que eu possa criar diretórios e editar arquivos JSON.