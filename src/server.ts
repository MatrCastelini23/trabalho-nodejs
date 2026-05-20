import "reflect-metadata"; //importando o reflect-metadata, que é uma biblioteca que permite usar decorators no TypeScript, que são usados para definir as entidades do banco de dados e suas propriedades
import "dotenv/config"; //importando o dotenv, que é uma biblioteca que permite carregar variáveis de ambiente a partir de um arquivo .env, para configurar a conexão com o banco de dados e outras configurações do servidor
import express from "express"; //importando o express
import cors from "cors"; //importando o cors, que é uma biblioteca que permite configurar o CORS (Cross-Origin Resource Sharing) para permitir que o servidor aceite requisições de outros domínios
import { criarUsuario } from "./routes/create.js"; //importando a função criarUsuario, que é usada para criar um novo usuário no banco de dados, e é chamada na rota POST /create
import AppDataSource from "./banco/connection.js";
import { lerUsuarioPorId, lerUsuarios } from "./routes/read.js";
import { atualizarUsuario } from "./routes/update.js";
import { deletarUsuario } from "./routes/delete.js";


const server = express();
server.use(cors());
server.use(express.json()); //configurando o express para usar o JSON, para que possa receber e enviar dados em formato JSON

server.post("/create", criarUsuario); //definindo a rota POST /create, que chama a função criarUsuario para criar um novo usuário no banco de dados

server.get("/read", lerUsuarios) //chama a função para ler todos os usuarios
 
server.get("/read/:id", lerUsuarioPorId) //chama a função para ler um usuario apenas

server.put("/update/:id", atualizarUsuario); //chama a função para atualizar um usuario

server.delete("/delete/:id", deletarUsuario); //chama a função para deletar um usuario

AppDataSource.initialize() //inicializando a conexão com o banco de dados, usando a função initialize do Typeorm, que retorna uma promise, e é usada para estabelecer a conexão com o banco de dados antes de iniciar o servidor
    .then(() => {
        console.log("Conexão com o banco de dados estabelecida com sucesso"); //exibe uma mensagem no console indicando que a conexão com o banco de dados foi estabelecida com sucesso
    })
    .catch((error) => {
        console.error("Erro ao estabelecer conexão com o banco de dados:", error); //exibe uma mensagem de erro no console caso haja um erro ao estabelecer a conexão com o banco de dados
    });

server.listen(process.env.PORT ?? 3000, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`); //exibe uma mensagem no console indicando que o servidor está rodando na porta especificada
});