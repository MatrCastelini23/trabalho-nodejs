// NextFuction é um tipo do Express que representa a função de próximo middleware na cadeia de middlewares. Ele é usado para passar o controle para o próximo middleware ou para lidar com erros.
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "./AppErros.js";

export function errorMiddleware(
    err: unknown, 
    req: Request, 
    res: Response, 
    next: NextFunction): void { 
    // Erros de validação do Zod
    if (err instanceof ZodError) {
        const fields = err.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
        }));

        res.status(422).json({
            status: "error",
            message: "Dados invalidos na requisição Z",
            fields,
        });

        return;
    }

    // Erros conhecidos da aplicação
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
        return;
    }

    // Erros desconhecidos (500)
    console.error("Erro inesperado:", err);

    res.status(500).json({
        status: "error",
        message: "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.",
    });
}