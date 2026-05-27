import "reflect-metadata"; //importando o reflect-metadata, que é uma biblioteca que permite usar decorators no TypeScript, que são usados para definir as entidades do banco de dados e suas propriedades
import "dotenv/config"; //importando o dotenv, que é uma biblioteca que permite carregar variáveis de ambiente a partir de um arquivo .env, para configurar a conexão com o banco de dados e outras configurações do servidor
import express from "express"; //importando o express
import cors from "cors"; //importando o cors, que é uma biblioteca que permite configurar o CORS (Cross-Origin Resource Sharing) para permitir que o servidor aceite requisições de outros domínios
import { AppDataSource } from "./database/data-source.js";
import { errorMiddleware } from "./middlewares/ErrorMiddleware.js";
import routes  from "./routes/routes.js";

const server = express();
const PORT = process.env.PORT; //definindo a porta do servidor, usando a variável de ambiente PORT ou a porta 3000 como padrão
server.use(cors());
server.use(express.json()); //configurando o express para usar o JSON, para que possa receber e enviar dados em formato JSON

server.use(routes); 

server.use(errorMiddleware); //se a req cair dentro do catch(error) dentro das rotas, o errorMiddleware é chamado. SEMPRE POR ULTIMO DEPOIS DAS ROTAS.

AppDataSource.initialize() //inicializando a conexão com o banco de dados, usando a função initialize do Typeorm, que retorna uma promise, e é usada para estabelecer a conexão com o banco de dados antes de iniciar o servidor
    .then(() => {
        console.log("Conexão com o banco de dados estabelecida com sucesso"); //exibe uma mensagem no console indicando que a conexão com o banco de dados foi estabelecida com sucesso
    })
    .catch((error) => {
        console.error("Erro ao estabelecer conexão com o banco de dados:", error); //exibe uma mensagem de erro no console caso haja um erro ao estabelecer a conexão com o banco de dados
    });

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`); //exibe uma mensagem no console indicando que o servidor está rodando na porta especificada
});