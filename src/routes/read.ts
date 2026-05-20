import { Request, Response } from 'express';
import { AppDataSource } from '../banco/connection.js';
import { User } from '../entity/User.js';


export async function lerUsuarios(req: Request, res: Response) {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const usuarios = await userRepository.find({
            select: ["nome", "email", "createdAt", "updatedAt"]    
        });
        
        return res.status(200).json(usuarios);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao ler usuários" });
    }
}
export async function lerUsuarioPorId(req: Request<{id: string}>, res: Response) {
    const id = parseInt(req.params.id);
    try {
        const userRepository = AppDataSource.getRepository(User);
        const usuario = await userRepository.findOne({
            select: ["nome", "email", "createdAt", "updatedAt"],
            where: { id }
        });
        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        return res.status(200).json(usuario);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao ler usuário" });
    }
}