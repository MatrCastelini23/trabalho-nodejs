import { response, request } from 'express';
import { AppDataSource } from '../banco/connection.js';
import { User } from '../entity/User.js';
import { Request, Response } from 'express-serve-static-core';
import { ParsedQs } from 'qs'; //importando o Request e Response do express, para tipar os parâmetros da função deleteUsuario.


//req response, request, Request, Response, ParsedQs, Record<string, any> são tipos do express e do qs, que são usados para tipar os parâmetros da função deleteUsuario, para garantir que os tipos dos parâmetros sejam corretos e evitar erros de tipo durante a execução da função.
export async function deleteUsuario(req: Request<{ id: string; }, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>) {
    const id = parseInt(req.params.id); //pegando o id do usuário a ser deletado, que é passado como parâmetro na URL, e convertendo para inteiro.
    try {
        await AppDataSource.getRepository(User).delete(id);
        res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar usuário" });
    }
}
