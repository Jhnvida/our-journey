# Our Journey — Linha do Tempo e Memórias do Casal

Aplicação web desenvolvida para casais acompanharem e imortalizarem marcos de seu relacionamento, reunindo contagem de tempo em tempo real, linha do tempo interativa, galeria de fotos com layout masonry, livro de receitas afetivas e metas para o futuro, com painel administrativo seguro integrado ao **Supabase**.

---

[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Motion](https://img.shields.io/badge/Motion-13.1-black?style=flat&logo=framer&logoColor=white)](https://motion.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-BaaS-3FCF8E?style=flat&logo=supabase&logoColor=white)](https://supabase.com/)
[![ESLint](https://img.shields.io/badge/Linter-ESLint-4B32C3?style=flat&logo=eslint&logoColor=white)](https://eslint.org/)
[![Licença Privada](https://img.shields.io/badge/License-Privado-lightgrey?style=flat)](#licença)

---

## Sumário

- [Visão Geral](#visão-geral)
- [Funcionalidades Principais](#funcionalidades-principais)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Instalação e Execução](#instalação-e-execução)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Módulos e Navegação](#módulos-e-navegação)
- [Padrões de Versionamento](#padrões-de-versionamento)
- [Licença](#licença)

---

## Visão Geral

O **Our Journey** foi idealizado para transformar momentos especiais em uma narrativa visual e interativa. A plataforma combina um design acolhedor e emocional com engenharia frontend moderna: animações orquestradas na GPU com Motion, transições de rotas fluidas com `AnimatePresence`, tipografia refinada e integração em tempo real com o banco de dados e autenticação do Supabase.

Além da área pública concebida para visualização das memórias, a aplicação conta com um painel administrativo protegido por autenticação dupla (Supabase Auth e chave de acesso compartilhada configurável), permitindo ao casal alimentar e gerenciar facilmente seus registros.

---

## Funcionalidades Principais

- **Contador em Tempo Real:** Cálculo e exibição dinâmica da duração do relacionamento em anos, meses e dias, com sincronização precisa de datas.
- **Linha do Tempo (Timeline):** Apresentação cronológica dos eventos e momentos mais marcantes do casal, com fotos, títulos e descrições detalhadas.
- **Próximos Capítulos:** Lista de metas, sonhos e planos para o futuro com indicador visual de status (planejado ou concluído).
- **A Nossa Cozinha:** Livro digital interativo com receitas favoritas preparadas a dois.
- **Galeria de Memórias:** Galeria de fotos responsiva em grade masonry com suporte a carregamento otimizado.
- **Painel Administrativo:** Painel completo para gerenciamento (criação, edição e exclusão) de eventos, receitas, metas, fotografias e configurações do sistema.
- **Autenticação Flexível e Segura:** Controle de acesso protegido com Supabase Auth e suporte a chave de acesso compartilhada para conveniência do casal.

---

## Tecnologias Utilizadas

### Frontend

- **[React 19](https://react.dev/):** Biblioteca para construção da interface com suporte ao React Compiler.
- **[TypeScript](https://www.typescriptlang.org/):** Tipagem estática rigorosa para componentes e esquemas de dados.
- **[Vite 8](https://vitejs.dev/):** Ferramenta de build rápida com recarregamento em tempo real (HMR).
- **[React Router DOM 7](https://reactrouter.com/):** Sistema de navegação e proteção de rotas privadas.
- **[Motion](https://motion.dev/):** Motor de animações declarativas de alta performance para transições de tela e microinterações.
- **[CSS Modules](https://github.com/css-modules/css-modules):** Estilos isolados por componente para prevenir colisões de classes.
- **[Date-fns](https://date-fns.org/):** Utilitários modernos e imutáveis para manipulação e formatação de datas.
- **[Lucide React](https://lucide.dev/):** Biblioteca de ícones vetoriais.

### Backend & Serviços

- **[Supabase](https://supabase.com/):** Backend-as-a-Service para persistência relacional no PostgreSQL e autenticação segura de usuários.

### Qualidade de Código

- **[ESLint 10](https://eslint.org/):** Padronização e verificação de regras JavaScript/TypeScript com `typescript-eslint` e regras do ecossistema React.
- **[Stylelint 17](https://stylelint.io/):** Validação e ordenação de regras em arquivos CSS (`stylelint-config-clean-order`).

---

## Estrutura do Projeto

```text
our-journey/
├── public/                 # Favicons e manifestos estáticos
├── src/
│   ├── components/         # Componentes React compartilhados
│   │   ├── feedback/       # Indicadores e tela de pré-carregamento (Preloader)
│   │   ├── layout/         # Cabeçalho administrativo (DashboardHeader)
│   │   ├── providers/      # Provedores de contexto (AuthProvider)
│   │   ├── routing/        # Guardas de proteção de rota (ProtectedRoute)
│   │   └── ui/             # Primitivas visuais (MasonryCard, SectionHeader, etc.)
│   ├── hooks/              # Hooks customizados para dados e autenticação
│   ├── lib/                # Configuração do cliente Supabase
│   ├── pages/              # Telas da aplicação (Home, Login, Dashboard e módulos)
│   ├── styles/             # Tokens de tema, fontes e resets globais
│   ├── types/              # Definições de tipos TypeScript
│   ├── utils/              # Funções de formatação e cálculos de datas
│   ├── App.tsx             # Estrutura de rotas declarativas e Suspense
│   └── main.tsx            # Ponto de entrada da aplicação
├── .env.example            # Modelo de configuração de variáveis
├── .stylelintrc.json       # Configuração do Stylelint
├── eslint.config.js        # Configuração do ESLint
├── package.json            # Manifesto de dependências e scripts npm
├── tsconfig.json           # Configuração do TypeScript
├── vercel.json             # Configurações de deploy na Vercel
└── vite.config.ts          # Configuração do Vite
```

---

## Pré-requisitos

Antes de executar o projeto, certifique-se de possuir:

- [Node.js](https://nodejs.org/) (versão 18.0.0 ou superior recomendada)
- [npm](https://www.npmjs.com/) (gerenciador de pacotes)
- Um projeto ativo no [Supabase](https://supabase.com/) com as tabelas de eventos, metas, receitas e galeria criadas.

---

## Variáveis de Ambiente

Crie o arquivo `.env` na raiz do projeto com base no arquivo `.env.example`:

```bash
cp .env.example .env
```

Preencha os valores conforme seu projeto Supabase:

| Variável                        | Descrição                           | Exemplo                           |
| ------------------------------- | ----------------------------------- | --------------------------------- |
| `VITE_SUPABASE_URL`             | URL de endpoint do projeto Supabase | `https://seu-projeto.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Chave pública anônima do Supabase   | `sua_chave_publica_aqui`          |

---

## Instalação e Execução

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/Jhnvida/our-journey.git
    cd our-journey
    ```

2. **Instale as dependências:**

    ```bash
    npm install
    ```

3. **Inicie o servidor de desenvolvimento:**

    ```bash
    npm run dev
    ```

4. **Acesse no navegador:**
   Abra [http://localhost:5173](http://localhost:5173).

---

## Scripts Disponíveis

| Comando                | Descrição                                                                 |
| ---------------------- | ------------------------------------------------------------------------- |
| `npm run dev`          | Inicia o servidor local de desenvolvimento Vite.                          |
| `npm run build`        | Checagem de tipos (`tsc -b`) e geração do pacote de produção em `dist/`.  |
| `npm run preview`      | Inicia um servidor HTTP local para testar a versão compilada de produção. |
| `npm run lint`         | Executa o linter ESLint em todo o código da aplicação.                    |
| `npm run lint:css`     | Verifica a conformidade das folhas de estilo CSS via Stylelint.           |
| `npm run lint:css:fix` | Corrige de forma automatizada problemas de formatação no CSS.             |

---

## Módulos e Navegação

- **Página Inicial (`/`):** Exibição pública com contador dinâmico de relacionamento, linha do tempo dos momentos principais, próximos capítulos, receitas e galeria de fotos.
- **Login (`/login`):** Tela de autenticação com validação de credenciais ou chave de acesso para entrada no painel.
- **Painel Administrativo (`/dashboard`):** Área restrita protegida por autenticação para gestão completa do conteúdo:
    - `/dashboard`: Gerenciamento da linha do tempo (criação, edição e exclusão de marcos históricos).
    - `/dashboard/gallery`: Upload, categorização e exclusão de fotos do acervo afetivo.
    - `/dashboard/chapters`: Cadastro e acompanhamento de metas e planos do casal.
    - `/dashboard/recipes`: Caderno de receitas compartilhadas e preparos culinários.
    - `/dashboard/settings`: Gerenciamento da chave de acesso e configurações da conta.

---

## Padrões de Versionamento

Este repositório segue a especificação [Conventional Commits](https://www.conventionalcommits.org/pt-br/):

- `feat:` Novas funcionalidades ou telas adicionadas.
- `fix:` Correções de bugs ou ajustes em cálculos.
- `docs:` Alterações na documentação técnica.
- `style:` Formatação de layout ou estilos visuais sem alteração funcional.
- `refactor:` Refatorações na arquitetura e divisão de componentes.
- `perf:` Otimizações em renderizações ou carregamento de mídia na GPU.
- `chore:` Atualizações de dependências e arquivos de configuração.

---

## Licença

Este projeto é de natureza privada e desenvolvimento pessoal. Não possui licença pública aberta para uso comercial ou distribuição. Todos os direitos reservados.
