import { Request, Response } from "express"; //importando os tipos Request e Response do express, para tipar os parâmetros da função criarUsuario
import { AppDataSource } from "../banco/connection.js";//importando a entidade User para que possa ser usada para criar um novo usuário no banco de dados
import { User } from "../entity/User.js";//importando a entidade User para que possa ser usada para criar um novo usuário no banco de dados
import { userSchema } from "../schemas/userSchema.js";

export async function criarUsuario(req: Request, res: Response) { 
    // 1. Valida os dados com Zod
    const parsed = userSchema.safeParse(req.body);
    // 2. Se os dados forem inválidos, retorna um erro com detalhes dos campos inválidos
    if (!parsed.success) {
        return res.status(409).json({ 
            error: "Dado invalidos",
            details: parsed.error//a função flatten do Zod é usada para transformar os erros de validação em um formato mais fácil de ler, onde cada campo inválido é listado com seus respectivos erros de validação
        });
    }
    
    // 3. Se os dados forem válidos, cria um novo usuário no banco de dados
    const { nome, email, senha, idade } = parsed.data;
    
    try {
        
        const userRepository = AppDataSource.getRepository(User); //variavel userRepository recebe a função getRepository do Typeorm, que recebe como parâmetro o nome da entidade User, para que possa ser usada para realizar operações no banco de dados, como criar, ler, atualizar e deletar usuário
        // Verifica se o email já existe no banco de dados
        const emailExists = await userRepository.findOne({ where: { email } }); //verifica se o email já existe no banco de dados, usando a função findOne do Typeorm, que recebe como parâmetro um objeto com a propriedade where, que é usada para filtrar os registros do banco de dados, e verifica se o email recebido na requisição já existe no banco de dados
        if (emailExists) {
            return res.status(409).json({ error: "Email já cadastrado" });
        }

        //cria um novo usuário usando a função create do Typeorm, que recebe como parâmetro um objeto com as propriedades do usuário, e retorna um novo objeto do tipo User
        const newUser = userRepository.create({ 
            nome,
            email,
            senha,
            idade
        });
        await userRepository.save(newUser);

        // 4. Retorna uma resposta de sucesso
        return res.status(201).json({ message: "Usuário criado com sucesso" });

    } catch (error) {
        // 5. Se houver um erro ao criar o usuário, retorna uma resposta de erro
        return res.status(500).json({ error: "Erro ao criar usuário" });
    }
}