import { Response, Request } from 'express';
import { AppDataSource } from '../banco/connection.js';
import { User } from '../entity/User.js';
import { userSchema } from '../schemas/userSchema.js';

export async function atualizarUsuario(req: Request<{id: string}>, res: Response) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }
    const parsed = userSchema.partial().safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            error: "Dados inválidos",
            details: parsed.error.flatten()
        });
    }
    const { nome, email, idade } = parsed.data;
    try {
        await AppDataSource.getRepository(User).update(id, { nome, email, idade });
        return res.status(200).json({ message: "Usuário atualizado com sucesso" });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao atualizar usuário" });
    }
}