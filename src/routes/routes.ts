import { Request, Response, NextFunction } from "express"; //importando os tipos Request e Response do express, para tipar os parâmetros da função criarUsuario
import { AppDataSource } from "../database/connection.js";//importando a entidade User para que possa fazer operações no banco de dados
import { User } from "../entity/User.js";//importando a entidade User para que possa ser usada para criar um novo usuário no banco de dados
import { userSchema } from "../schemas/userSchema.js";
import { AppError } from "../erros/AppErros.js";


// cria usuario
export async function criarUsuario(req: Request, res: Response, next: NextFunction) { 
    try{
        // Valida os dados com o Zod
        const { name, email, password, age } = userSchema.parse(req.body); 
    
        const userRepository = AppDataSource.getRepository(User); // Obtém o repositório da entidade User para realizar operações no banco de dados
        
        const emailExiste = await userRepository.findOne({ where: { email } }); // Verifica se o email já existe no banco de dados
        if (emailExiste) {
            throw new AppError("Email já possui cadastro", 409); // Lança um erro caso o email já exista, com status code 409 (Conflict)
        }

        const novoUsuario = userRepository.create({ name, email, password, age }); // Cria um novo usuário com os dados validados
        await userRepository.save(novoUsuario); // Salva o novo usuário no banco de dados

        return res.status(201).json({ message: "Usuario cadastrado com sucesso" }); // Retorna o novo usuário criado com status code 201 (Created)
    }catch(error){
        next(error); // repassa o erro para o middleware global tratar (ZodError, AppError, ou erro inesperado)
    }
}

// deleta usuario
export async function deletarUsuario(req: Request<{id: string}>, res: Response, next: NextFunction) {
    try{
        const { id } = req.params;
        if (!id) {
            throw new AppError('ID do usuário é obrigatório', 400);
        }
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({where: {id: parseInt(id)}});
        if (!user) {
            throw new AppError('Usuário não encontrado', 404);
        }

        await userRepository.remove(user);
        return res.status(204).send(); // Retorna status code 204 (No Content)
    }catch(error){
        next(error);
    }
}


// Lista todos os usuários
export async function lerUsuarios(req: Request, res: Response, next: NextFunction) {
    try{
        // Obtém o repositório da entidade User para realizar operações no banco de dados
        const userRepository = AppDataSource.getRepository(User);
        // Constrói a consulta com base nos parâmetros fornecidos
        const users = await userRepository.createQueryBuilder("user").select(["user.name", "user.email", "user.age"]).getMany();

        if (!users) {
            throw new AppError("Nenhum usuário encontrado", 404);
        }

        return res.status(200).json({message: "Usuários encontrados", data: await users}); // Retorna a lista de usuários encontrados com status code 200 (OK)
    }catch(error){
        next(error);
    }
}

// Lista um usuário específico por ID
export async function lerUsuarioPorId(req: Request<{id: string}>, res: Response, next: NextFunction) {
    try{
        const id = parseInt(req.params.id);
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.createQueryBuilder("user").select(["user.name", "user.email", "user.age"]).where("user.id = :id", { id }).getOne( );
        if (!user) {
            throw new AppError("Usuário não encontrado", 404);
        }
        return res.status(200).json({message: "Usuário encontrado", data: user});
    }catch(error){
        next(error);
    }
}
// atualiza usuario por ID
export const atualizarUsuario = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try{
        const { id } = req.params;
        const parsed = userSchema.safeParse(req.body);
        // Se os dados do body forem invalidos, erro 400 (Bad Request)
        if (!parsed.success) {
            throw new AppError("Dados inválidos", 400);
        }

        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { id: parseInt(id) } });
        if (!user) {
            throw new AppError("Usuário não encontrado", 404);
        }
        userRepository.merge(user, parsed.data);
        await userRepository.save(user);
        return res.status(200).json({ message: "Usuário atualizado com sucesso" });
    }catch(error){
        next(error);
    }
}