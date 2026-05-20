import { Response, Request } from 'express';
import { AppDataSource } from '../banco/connection.js';
import { User } from '../entity/User.js';
import { userSchema } from '../schemas/userSchema.js';

export const atualizarUsuario = async (req: Request<{ id: string }>, res: Response) => {
    const id = parseInt(req.params.id);
    const { nome, email, idade } = req.body;
    const parsed = userSchema.partial().safeParse({ nome, email, idade });
    if (!parsed.success) {
        return res.status(400).json({ message: "Dados inválidos" });
    }

    // Verificar se o email já foi cadastrado
    if (parsed.data.email) {
        const emailExists = await AppDataSource.getRepository(User).findOne({ where: { email: parsed.data.email } });   
        if (emailExists && emailExists.id !== id) {
            return res.status(400).json({ message: "Email já em uso por outro usuário" });
        }
    };    

    try {
        await AppDataSource.getRepository(User).update(id, { nome, email, idade });
        res.status(200).json({ message: "Usuário atualizado com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar usuário" });
    }

}