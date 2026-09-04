# Our Journey (Nossa Jornada)

Uma aplicação web desenvolvida para casais acompanharem e registrarem os marcos do seu relacionamento. O projeto permite visualizar o tempo juntos, uma linha do tempo com momentos especiais, os próximos capítulos planejados para o futuro, uma cozinha compartilhada e galeria de fotos.

## Funcionalidades

- **Contador de tempo**: Exibe o tempo de relacionamento em anos, meses e dias.
- **Linha do tempo (Timeline)**: Exibe os principais momentos e eventos marcantes com fotos, títulos e descrições.
- **Próximos Capítulos**: Lista de planos e metas futuras do casal, indicando se já foram concluídos ou não.
- **A Nossa Cozinha**: Lista de receitas favoritas do casal.
- **Galeria de Fotos**: Espaço para salvar memórias visuais.
- **Autenticação e Painel Administrativo**: Sistema de login para acesso a uma área restrita gerenciada pelo Supabase, permitindo edição de todo o conteúdo.

## Tecnologias Utilizadas

- **Frontend:**
    - [React 19](https://react.dev/) (com React Compiler)
    - [TypeScript](https://www.typescriptlang.org/)
    - [Vite](https://vitejs.dev/)
    - [React Router DOM](https://reactrouter.com/) para rotas
    - [Motion](https://motion.dev/) para animações e transições fluidas
    - [CSS Modules](https://github.com/css-modules/css-modules) para estilização
    - [Lucide React](https://lucide.dev/) para ícones
    - [Date-fns](https://date-fns.org/) para manipulação de datas
- **Backend & Serviços:**
    - [Supabase](https://supabase.com/) (Autenticação e Banco de Dados)

## Estrutura do Projeto

A estrutura de pastas principal dentro de `src/` está organizada da seguinte forma:

- `/assets`: Imagens e recursos estáticos.
- `/components`: Componentes globais e reutilizáveis (ex: `SectionHeader`, `ProtectedRoute`).
- `/contexts`: Contextos globais do React (ex: `AuthProvider`).
- `/hooks`: Hooks customizados para integração com o Supabase e lógicas da aplicação.
- `/lib`: Configuração de bibliotecas externas (ex: cliente do Supabase).
- `/pages`: Telas da aplicação (`Home`, `Login`, `Dashboard` e seus sub-módulos).
- `/styles`: Estilos globais e variáveis CSS.
- `/types`: Definições de tipos do TypeScript.
- `/utils`: Funções utilitárias.

## Pré-requisitos

Antes de iniciar, você precisará ter instalado em sua máquina:

- [Node.js](https://nodejs.org/en/) (recomendado versão 18 ou superior)
- Um gerenciador de pacotes como `npm`, `yarn` ou `pnpm`
- Uma conta no [Supabase](https://supabase.com/) com um projeto configurado (banco de dados e autenticação).

## Instalação e Configuração

1. Clone o repositório:

    ```bash
    git clone <url-do-repositorio>
    ```

2. Acesse a pasta do projeto:

    ```bash
    cd our-journey
    ```

3. Instale as dependências:

    ```bash
    npm install
    ```

4. Configure as variáveis de ambiente:
    - Crie um arquivo `.env` na raiz do projeto com base no arquivo `.env.example`:
        ```bash
        cp .env.example .env
        ```
    - Preencha o arquivo `.env` com as suas credenciais do Supabase:
        ```env
        VITE_SUPABASE_URL=https://seu-projeto.supabase.co
        VITE_SUPABASE_PUBLISHABLE_KEY=sua_chave_publica_do_supabase
        ```

## Como Executar

Para iniciar o servidor de desenvolvimento, execute o comando:

```bash
npm run dev
```

Acesse a aplicação no seu navegador padrão (geralmente em `http://localhost:5173`).

## Como Usar

- **Página Inicial (`/`)**: Exibe o contador de tempo, a linha do tempo, a lista de próximos capítulos e o livro de receitas (dados provenientes do Supabase).
- **Login (`/login`)**: Página para autenticação de usuários e administradores.
- **Painel Administrativo (`/dashboard`)**: Área restrita (protegida por autenticação) onde é possível gerenciar (criar, editar, excluir) os eventos da linha do tempo, receitas, capítulos futuros, fotos da galeria e configurações do sistema.
