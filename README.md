# Our Journey (Nossa Jornada)

Uma aplicação web desenvolvida para casais acompanharem e registrarem os marcos do seu relacionamento. O projeto permite visualizar o tempo juntos, uma linha do tempo com momentos especiais e os próximos capítulos planejados para o futuro.

## Funcionalidades

- **Contador de tempo**: Exibe o tempo de relacionamento em anos, meses e dias.
- **Linha do tempo (Timeline)**: Exibe os principais momentos e eventos marcantes com fotos, títulos, descrições e subeventos.
- **Próximos Capítulos**: Lista de planos e metas futuras do casal, indicando se já foram concluídos ou não.
- **Autenticação e Painel (Dashboard)**: Sistema de login para acesso a um painel de controle utilizando Supabase.

## Tecnologias Utilizadas

- **Frontend:**
    - [React 19](https://react.dev/) (com React Compiler)
    - [TypeScript](https://www.typescriptlang.org/)
    - [Vite](https://vitejs.dev/)
    - [React Router DOM](https://reactrouter.com/) para rotas
    - [CSS Modules](https://github.com/css-modules/css-modules) para estilização
    - [Lucide React](https://lucide.dev/) para ícones
    - [Date-fns](https://date-fns.org/) para manipulação de datas
- **Backend & Serviços:**
    - [Supabase](https://supabase.com/) (Autenticação e Banco de Dados)

## Estrutura do Projeto

A estrutura de pastas principal dentro de `src/` está organizada da seguinte forma:

- `/assets`: Imagens e recursos estáticos.
- `/components`: Componentes reutilizáveis de interface (`Counter`, `Timeline`, `Chapters`, `Container`, `Footer`).
- `/hooks`: Custom hooks contendo a lógica de negócios e integração com o Supabase (`useAuth`, `useCounter`, `useTimeline`, `useChapters`).
- `/lib`: Configuração de bibliotecas externas (ex: cliente do Supabase).
- `/pages`: Páginas da aplicação (`Home`, `Login`, `Dashboard`).
- `/styles`: Estilos globais e variáveis CSS.

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

Acesso a aplicação no seu navegador padrão (geralmente em `http://localhost:5173`).

## Como Usar

- **Página Inicial (`/`)**: Exibe o contador de tempo, a linha do tempo e a lista de próximos capítulos (dados provenientes do Supabase).
- **Login (`/login`)**: Página para autenticação de usuários.
- **Painel de Controle (`/dashboard`)**: Área restrita (protegida por autenticação) onde é possível verificar o usuário logado e efetuar logout.
