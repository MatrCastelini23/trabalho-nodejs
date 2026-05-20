import { Response, Request } from 'express';
import { AppDataSource } from '../banco/connection.js';
import { User } from '../entity/User.js';
import { userSchema } from '../schemas/userSchema.js';

export async function deletarUsuario(req: Request<{id: string}>, res: Response) {
    const id = req.params.id;
    try {
        const userRepository = AppDataSource.getRepository(User);
        const usuario = await userRepository.findOne({
            where: { id }
        });
        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        await userRepository.remove(usuario);
        return res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao deletar usuário" });
    }
}


