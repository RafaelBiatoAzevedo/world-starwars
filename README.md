# World Star Wars

Uma enciclopédia de Star Wars em português, com visual cinematográfico, navegação responsiva e uma coleção pessoal de favoritos. Reformulação do projeto original, preservando seus personagens, imagens e identidade.

## Começar

É necessário **Node.js 22.12 ou superior**.

```sh
npm ci
npm run dev
```

Abra o endereço exibido no terminal, normalmente `http://localhost:5173`. `npm start` também inicia o ambiente de desenvolvimento.

```sh
npm run build    # Verifica os tipos e gera dist/
npm run preview  # Serve a versão de produção
```

Em uma hospedagem estática, configure as rotas desconhecidas para servir `index.html`. Isso permite abrir e atualizar diretamente endereços como `/characters/1` e `/planets/1`.

## Publicar no Netlify

A configuração está versionada em `netlify.toml` e `.nvmrc`:

- **Node.js:** 24.
- **Gerenciador:** npm, usando `package-lock.json`.
- **Comando de build:** `npm run build`.
- **Diretório publicado:** `dist`.
- **Rotas da aplicação:** redirecionamento interno para `/index.html`, preservando os arquivos estáticos existentes.

O arquivo `.nvmrc` também permite selecionar a mesma versão localmente com `nvm use`. No Netlify, ele tem precedência sobre uma versão antiga configurada no painel, conforme a [documentação de versões do Node.js](https://docs.netlify.com/build/configure-builds/manage-dependencies/#node-js-and-javascript).

Depois de enviar esses arquivos ao repositório conectado ao Netlify, inicie um novo deploy. A configuração versionada substitui o comando antigo `yarn build` e a pasta `build` definidos no painel.

## O que está pronto

- **Seis categorias completas:** 82 personagens, 60 planetas, 6 filmes, 37 espécies, 36 naves e 39 veículos.
- Busca por nome, insensível a acentos e maiúsculas. Os filmes também podem ser encontrados pelo título original.
- Filtros específicos de cada categoria, ordenação, paginação e modos de visualização em cards ou lista.
- Fichas com dados técnicos, valores formatados em português e conexões navegáveis entre os registros.
- Busca global pelo botão da navegação ou pelo atalho **Ctrl+K / ⌘K**, com fechamento por **Esc**.
- Favoritos persistidos em `localStorage`, sincronizados entre abas, com busca e filtro por categoria.
- Layouts para celular, tablet e desktop, menu móvel, navegação por teclado e suporte a movimento reduzido.
- Tratamento de endereços inválidos, buscas sem resultados, imagens indisponíveis e armazenamento bloqueado.
- Imagens WebP e fontes locais; o funcionamento do catálogo não depende de requisições a serviços externos durante a navegação.

A coleção pertence ao navegador e dispositivo utilizados. Não há conta, sincronização em nuvem ou backend.

## Dados e imagens

Os **260 registros** vêm da [SWAPI](https://swapi.info/documentation). A base inclui os episódios I a VI. Valores desconhecidos são apresentados como tais, sem inventar informações.

O catálogo fica versionado em `src/data/snapshot.json`. Para atualizá-lo com acesso à internet:

```sh
npm run data:refresh
npm test
npm run build
```

A atualização valida as seis respostas antes de substituir o arquivo, preservando o catálogo anterior caso uma chamada falhe. As contagens exibidas na aplicação são calculadas a partir dos dados.

As imagens em uso estão em WebP; os arquivos antigos sem referência e as cópias duplicadas foram removidos. Quando vários registros usam a mesma imagem, o catálogo compartilha um único arquivo. Imagens adicionais foram obtidas do [Star Wars Databank](https://www.starwars.com/databank); seus endereços e páginas de origem estão em `public/images/credits.json`. Registros sem imagem usam uma composição visual da respectiva categoria.

Star Wars e seus personagens pertencem à Lucasfilm Ltd. Este é um projeto de fã, sem fins comerciais.

## Organização

```text
src/
  components/  Navegação, busca global, cards e botões de coleção
  context/     Estado da coleção e persistência defensiva
  data/        Tipos, catálogo, imagens e cópia local dos dados
  lib/         Busca, filtros, formatação e relacionamentos
  pages/       Início, catálogo, coleção, detalhes e página 404
  shared/      Imagens WebP dos personagens e filmes
  styles.css   Identidade visual e layouts responsivos
scripts/
  refresh-data.mjs
tests/
  app.spec.ts  Testes de navegação e acessibilidade no navegador
```

**Tecnologias:** React 19, TypeScript, Vite, React Router e Lucide. A antiga configuração de Create React App, os provedores acoplados e as requisições repetidas foram substituídos por componentes compartilhados e um catálogo tipado.

## Verificações

```sh
npm run typecheck
npm test
npm run format:check
```

Os testes unitários verificam a integridade dos dados, as referências entre registros, a busca, a filtragem, a ordenação, a formatação e a recuperação de favoritos inválidos.

Para os testes de navegador:

```sh
npx playwright install chromium
npm run test:e2e
```

Também é possível usar uma instalação existente do Chrome:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/google-chrome npm run test:e2e
```

O Playwright inicia uma prévia na porta **5188**. A suíte cobre as seis seções, filtros, paginação, detalhes relacionados, persistência de favoritos, navegação móvel, foco no modal e páginas 404. Também verifica ausência de rolagem horizontal entre **320 e 1440 px** e executa uma auditoria automática de acessibilidade WCAG AA com axe. Uma auditoria automática não substitui avaliação manual com tecnologias assistivas.

As capturas para revisão visual ficam em `artifacts/`; relatórios e rastros de falhas ficam em `test-results/`. Esses arquivos não são versionados.

```sh
npm run format # Formata o código-fonte
```
