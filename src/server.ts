import "reflect-metadata"; //importando o reflect-metadata, que é uma biblioteca que permite usar decorators no TypeScript, que são usados para definir as entidades do banco de dados e suas propriedades
import "dotenv";
import express from "express"; //importando o express
import cors from "cors"; //importando o cors, que é uma biblioteca que permite configurar o CORS (Cross-Origin Resource Sharing) para permitir que o servidor aceite requisições de outros domínios
import { AppDataSource } from "./banco/connection.js";//importando a conexão do banco de dados, para que possa ser usada para estabelecer a conexão com o banco de dados
import { User } from "./entity/User.js";//importando a entidade User para que possa ser usada para criar um novo usuário no banco de dados


const server = express();
server.use(cors());
server.use(express.json()); //configurando o express para usar o JSON, para que possa receber e enviar dados em formato JSON

await AppDataSource.initialize(); //estabelece a conexão com o banco de dados usando a função initialize do Typeorm, que é uma função assíncrona, por isso o uso do await, para garantir que a conexão seja estabelecida antes de realizar qualquer operação no banco de dados  
const userRepository = AppDataSource.getRepository("User"); //variavel userRepository recebe a função getRepository do Typeorm, que recebe como parâmetro o nome da entidade User, para que possa ser usada para realizar operações no banco de dados, como criar, ler, atualizar e deletar usuário

const user = new User(); //variavel user recebe a classe User, para que possa ser usada para criar um novo usuário no banco de dados

user.nome = "Matheus"; //atribui o nome "Matheus" ao usuário
user.email = "matheus@gmail.com"; //atribui o email "matheus@gmail.com" ao usuário
user.senha = "123456"; //atribui a senha "123456" ao usuário
user.idade = 25; //atribui a idade 25 ao usuário
user.createdAt = new Date(); //atribui a data atual ao campo createdAt do usuário
user.updatedAt = new Date(); //atribui a data atual ao campo updatedAt do usuário

await userRepository.save(user); //salva o usuário no banco de dados usando a função save do Typeorm, que recebe como parâmetro o usuário criado

server.listen(3000, () => {
    console.log("Servidor rodando na porta 3000"); //exibe uma mensagem no console indicando que o servidor está rodando na porta 3000
});