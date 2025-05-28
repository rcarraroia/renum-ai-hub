# Documentação do Frontend do Renum AI Hub

## Visão Geral

O Renum AI Hub é uma plataforma central para acesso a diferentes agentes de IA, cada um especializado em uma função específica. O frontend foi desenvolvido utilizando React com TypeScript, Tailwind CSS e Shadcn/UI para componentes, seguindo uma abordagem incremental e modular.

## Estrutura do Projeto

```
src/
├── components/
│   ├── agents/
│   │   ├── code/           # Componentes específicos do CodeSupportAgent
│   │   ├── content/        # Componentes específicos do ContentCreatorAgent
│   │   ├── data/           # Componentes específicos do DataAnalystAgent
│   │   └── taskmaster/     # Componentes específicos do RenumTaskMaster
│   ├── shared/             # Componentes compartilhados entre agentes
│   └── ui/                 # Componentes de UI básicos (Shadcn/UI)
├── hooks/                  # Hooks customizados
├── lib/                    # Utilitários e integrações
│   └── api/                # Integrações com API
├── pages/                  # Páginas da aplicação
└── App.tsx                 # Componente principal
```

## Agentes Implementados

### 1. RenumTaskMaster
- Gerenciamento de tarefas
- Visualizações em lista e kanban
- Criação e edição de tarefas
- Filtros por status e prioridade

### 2. ContentCreatorAgent
- Geração de conteúdo (e-mails, posts, artigos)
- Biblioteca de conteúdos
- Seleção de tipo, plataforma e tom
- Visualização e exportação

### 3. DataAnalystAgent
- Análise de dados estruturados
- Visualizações e gráficos
- Insights e recomendações
- Exportação de resultados

### 4. CodeSupportAgent
- Geração de código
- Editor com syntax highlighting
- Visualização de estrutura de arquivos
- Suporte a múltiplas linguagens

## Hooks Utilitários

- `useTheme`: Gerenciamento de tema (claro/escuro/sistema)
- `useScrollReset`: Reset de scroll ao navegar entre páginas
- `useMediaQuery`: Detecção responsiva de breakpoints
- `useLocalStorage`: Persistência de dados no localStorage
- `useCopyToClipboard`: Cópia de texto para área de transferência
- `useDebounce`: Debounce para inputs e pesquisas
- `useKeyPress`: Detecção de teclas pressionadas
- `useOnlineStatus`: Verificação de status de conexão

## Integração com Backend

Cada agente se comunica com o backend através de endpoints específicos:
- `/api/taskmaster`: Gerenciamento de tarefas
- `/api/content`: Geração e gerenciamento de conteúdo
- `/api/data`: Análise de dados
- `/api/code`: Geração e gerenciamento de código

Em ambiente de desenvolvimento, são utilizados dados simulados para facilitar o desenvolvimento e testes.

## Considerações de Performance

- Memoização de componentes com React.memo
- Lazy loading de páginas e componentes pesados
- Debounce em inputs de pesquisa
- Otimização de re-renderizações

## Acessibilidade

- Suporte a navegação por teclado
- Contraste adequado para texto e elementos interativos
- Labels e descrições para leitores de tela
- Feedback visual para estados de interação

## Próximos Passos

- Implementação de testes automatizados (unitários e e2e)
- Integração com sistema de autenticação
- Expansão para novos agentes especializados
- Melhorias de performance para grandes conjuntos de dados
