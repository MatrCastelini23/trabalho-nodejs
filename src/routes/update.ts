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
    try {
        await AppDataSource.getRepository(User).update(id, { nome, email, idade });
        res.status(200).json({ message: "Usuário atualizado com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar usuário" });
    }

}