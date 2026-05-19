import { response, request } from 'express';
import { AppDataSource } from '../banco/connection.js';
import { User } from '../entity/User.js';
import { Request, Response } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

export const atualizarUsuario = async (req: Request<{ id: string; }, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>) => {
    const id = parseInt(req.params.id);
    const { nome, email, idade } = req.body;
    try {
        await AppDataSource.getRepository(User).update(id, { nome, email, idade });
        res.status(200).json({ message: "Usuário atualizado com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar usuário" });
    }

}