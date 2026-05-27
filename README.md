# Missão desse repositório

Backup do trabalho do segundo bimestre, e estudar as tecnologias obrigatórias passadas pelo professor.

- Node.js
- Express
- TypeScript
- TypeORM
- Zod
- SQlite3
- Dontev

-----------------------------------------------------------------------

### Libs typescript

- @type/node
- ts-node
- typescript

-------------------------------------------------------------------------

### Comandos:
- npx tsc --init -> baixar arquivo de configuração do typescript
- tsx compilador de typescript

---------------------------------------------------------------------------

# Tratativa de erros Globais

### AppError.ts 
- arquivo de tratativas  de  erros
- extende da interface Error
- constroi o status HTTP e a mensagem que o será atribuido nas rotas
- sempre que a rota cair em um erro e chama (AppError) esse arquivo entrará em ação
- retorna o status HTTP e a mensagem

### ErrorMiddleware.ts
- o middleware é chamado sempre que cai no catch (error){next(error)}
- ele irá tratar os erros num geral (Zod, do proprio AppError e desconhecidos)
- está setado em server.ts
- retorna o status HTTP e a mensagem

---------------------------------------------------------------------

# Migrations
- Criar o migration com o comando:
    - npx typeorm migration:create ./src/migration/create_table_user
- A criação da tabela passa pela migration
Após a sincronização ser desabilitada (synchronize: true comentada), e o campo migration criado, sempre que rodar o comando run dev a migration vai identificar se houve alteração ou se a tabela existe e irá criar caso não exista.
Em produção os arquivos de migrations são criados conforme a necessidade de tabelas, já em desenvolvimento o arquivo original pode ser editado sem preocupação

# Seeds:
- instalar o typeorm-extension
- comando no bash para rodar: npm run seed:run
Após a criação do arquivo seeds.ts e o banco criado com o migration, as seeds trabalham como uma base para povoar o banco.