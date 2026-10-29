# World Star Wars

Enciclopédia de Star Wars em português, com **260 registros** para explorar personagens, planetas, filmes, espécies, naves e veículos. A aplicação combina uma interface responsiva com busca, filtros, fichas relacionadas e uma coleção pessoal de favoritos.

O catálogo e os recursos visuais são servidos localmente. A navegação não depende de chamadas à API da SWAPI, e os favoritos ficam salvos no navegador.

## Funcionalidades

- **Seis categorias:** fichas com dados técnicos, valores formatados em português e links entre registros relacionados.
- **Busca global:** acesso pela navegação ou pelo atalho `Ctrl+K` / `⌘K`, com fechamento por `Esc`.
- **Busca no catálogo:** pesquisa sem diferenciar acentos ou maiúsculas, incluindo títulos originais dos filmes e modelos de naves e veículos.
- **Filtros e visualização:** filtros por categoria, ordenação por nome, paginação de 12 registros e modos de cards ou lista. O estado da consulta fica na URL.
- **Minha coleção:** adição e remoção de favoritos, busca e filtro por categoria, com persistência em `localStorage` e sincronização entre abas da mesma origem.
- **Interface responsiva:** menu móvel, navegação por teclado, suporte a movimento reduzido e tratamento de buscas vazias, imagens indisponíveis e rotas inválidas.

## Tecnologias

| Área                    | Tecnologias                                        |
| ----------------------- | -------------------------------------------------- |
| Interface               | React 19, TypeScript e CSS                         |
| Navegação               | React Router 7                                     |
| Desenvolvimento e build | Vite 8                                             |
| Ícones e fontes         | Lucide, Inter, Barlow Condensed e Star Jedi        |
| Testes                  | Vitest, Playwright e axe-core                      |
| Formatação              | Prettier                                           |
| Publicação              | Hospedagem estática, com configuração para Netlify |

## Executar localmente

### Pré-requisitos

- **Node.js 22.12 ou superior**. O arquivo [`.nvmrc`](.nvmrc) define a versão 24, também usada na configuração do Netlify.
- **npm**, com instalação das dependências a partir do `package-lock.json`.
- **Git**, caso o projeto seja obtido por clonagem.

### Instalação

```sh
git clone https://github.com/RafaelBiatoAzevedo/world-starwars.git
cd world-starwars
npm ci
npm run dev
```

Se você usa nvm, execute `nvm use` na pasta do projeto antes de instalar as dependências.

Abra o endereço exibido no terminal, normalmente `http://localhost:5173`. O comando `npm start` também inicia o servidor de desenvolvimento.

Não é necessário configurar variáveis de ambiente, chave de API ou backend para executar a aplicação.

### Build de produção

```sh
npm run build
npm run preview
```

O build verifica os tipos e gera os arquivos estáticos em `dist/`. O comando de prévia permite conferir o resultado localmente no endereço informado pelo Vite.

## Comandos disponíveis

| Comando                | Descrição                                                  |
| ---------------------- | ---------------------------------------------------------- |
| `npm run dev`          | Inicia o servidor de desenvolvimento.                      |
| `npm start`            | Alternativa a `npm run dev`.                               |
| `npm run build`        | Verifica os tipos e gera o build em `dist/`.               |
| `npm run preview`      | Serve o build de produção para conferência local.          |
| `npm run typecheck`    | Verifica os tipos sem gerar arquivos.                      |
| `npm test`             | Executa os testes unitários uma vez.                       |
| `npm run test:e2e`     | Executa os testes de navegador com Playwright.             |
| `npm run data:refresh` | Atualiza a cópia local do catálogo a partir da SWAPI.      |
| `npm run format`       | Formata os arquivos cobertos pela configuração do projeto. |
| `npm run format:check` | Verifica a formatação sem alterar arquivos.                |

## Catálogo e rotas

| Categoria   | Registros na base versionada | Rota          |
| ----------- | ---------------------------: | ------------- |
| Personagens |                           82 | `/characters` |
| Planetas    |                           60 | `/planets`    |
| Filmes      |                            6 | `/films`      |
| Espécies    |                           37 | `/species`    |
| Naves       |                           36 | `/starships`  |
| Veículos    |                           39 | `/vehicles`   |
| **Total**   |                      **260** |               |

A página inicial fica em `/`, e a coleção em `/collection`. As fichas seguem o formato `/:category/:id`, como `/characters/1` e `/planets/1`. A base de filmes abrange os episódios I a VI.

A coleção pertence ao navegador e dispositivo utilizados, sem conta ou sincronização em nuvem. Se o armazenamento estiver bloqueado, os favoritos ficam disponíveis apenas durante a visita, com um aviso na interface.

### Atualizar os dados

Os dados da [SWAPI](https://swapi.info) ficam versionados em [`src/data/snapshot.json`](src/data/snapshot.json). Para atualizar a base, é necessário acesso à internet:

```sh
npm run data:refresh
npm test
npm run build
```

O script [`scripts/refresh-data.mjs`](scripts/refresh-data.mjs) consulta as seis categorias e valida as respostas antes de substituir o arquivo. Se uma consulta falhar, o catálogo anterior é preservado. As contagens exibidas pela aplicação são calculadas a partir dos dados.

### Imagens e fontes

As imagens utilizadas estão em WebP, distribuídas entre `public/images/` e `src/shared/assets/images/`. O mapeamento de imagens adicionais fica em [`src/data/images.json`](src/data/images.json), e os créditos com as páginas e os arquivos de origem estão em [`public/images/credits.json`](public/images/credits.json).

Registros sem imagem usam uma composição visual da categoria. As fontes também são servidas localmente.

## Testes e qualidade

```sh
npm run typecheck
npm test
npm run format:check
```

Os testes unitários cobrem integridade do catálogo, referências entre registros, busca, filtros, ordenação, formatação de valores e recuperação de favoritos inválidos.

Para executar os testes de navegador, instale o Chromium do Playwright após instalar as dependências:

```sh
npx playwright install chromium
npm run test:e2e
```

Também é possível indicar uma instalação existente do Chrome. Em Linux, por exemplo, ajuste o caminho conforme sua instalação:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/google-chrome npm run test:e2e
```

O Playwright inicia o servidor de desenvolvimento em `http://127.0.0.1:5188` e executa os projetos de desktop e celular. A suíte cobre navegação, busca, filtros, paginação, detalhes relacionados, persistência de favoritos, foco do modal e páginas 404. Também verifica rolagem horizontal em larguras de 320 a 1440 px e executa auditorias automáticas de acessibilidade com axe-core.

As capturas de revisão visual ficam em `artifacts/`; capturas e rastros de falhas ficam em `test-results/`. Esses diretórios são ignorados pelo Git.

## Estrutura do projeto

```text
world-starwars/
├── public/                 # Favicon, manifesto e imagens públicas
├── scripts/
│   └── refresh-data.mjs     # Atualização do catálogo local
├── src/
│   ├── components/         # Layout, busca global, cards e ícones
│   ├── context/            # Estado e persistência da coleção
│   ├── data/               # Tipos, catálogo, imagens e snapshot da SWAPI
│   ├── fonts/              # Fonte Star Jedi
│   ├── lib/                # Busca, filtros, formatação e testes unitários
│   ├── pages/              # Início, catálogo, coleção, detalhes e página 404
│   ├── shared/assets/      # Imagens de personagens e filmes
│   ├── App.tsx             # Rotas e tratamento de erros
│   ├── main.tsx            # Entrada da aplicação
│   └── styles.css          # Estilos e layouts responsivos
├── tests/                  # Testes de navegador e acessibilidade
├── .nvmrc                  # Versão do Node.js para desenvolvimento
├── netlify.toml            # Build e redirecionamento de rotas no Netlify
├── playwright.config.ts    # Configuração dos testes de navegador
└── vite.config.ts          # Configuração do Vite e do Vitest
```

## Publicação

O projeto pode ser publicado como uma aplicação estática. A configuração do Netlify está versionada em [`netlify.toml`](netlify.toml):

| Configuração             | Valor                                  |
| ------------------------ | -------------------------------------- |
| Node.js                  | `24`                                   |
| Gerenciador de pacotes   | npm                                    |
| Comando de build         | `npm run build`                        |
| Diretório publicado      | `dist`                                 |
| Redirecionamento interno | `/*` → `/index.html`, com status `200` |

Em outra hospedagem, configure o fallback das rotas da aplicação para `index.html`, preservando os arquivos estáticos. Isso permite acessar ou atualizar diretamente páginas como `/characters/1`.

## Créditos

Dados provenientes da [SWAPI](https://swapi.info). As origens das imagens adicionais estão registradas no [arquivo de créditos](public/images/credits.json), incluindo referências ao Star Wars Databank.

Star Wars e seus personagens pertencem à Lucasfilm Ltd. Este é um projeto de fã, sem fins comerciais.
