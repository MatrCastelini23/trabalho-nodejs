import { response, request } from 'express';
import { AppDataSource } from '../banco/connection.js';
import { User } from '../entity/User.js';
import { userSchema } from '../schemas/userSchema.js';

export async function lerUsuarios(req = request, res = response) {
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
