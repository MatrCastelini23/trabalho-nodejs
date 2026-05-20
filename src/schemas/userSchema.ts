import { z } from "zod"; //importando o zod, que é uma biblioteca de validação de dados, para validar os dados recebidos na requisição e garantir que eles estejam no formato correto

// Definindo o schema de validação para os dados do usuário usando Zod
export const userSchema = z.object({ 
    nome: z.string().min(3).max(100),
    email: z.string().email(),
    senha: z.string().min(6).max(100),
    idade: z.number().min(0)
});

export type UserInput = z.infer<typeof userSchema>; 