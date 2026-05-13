import { z } from "zod"; //importando o zod, que é uma biblioteca de validação de dados, para validar os dados recebidos na requisição e garantir que eles estejam no formato correto

export const userSchema = z.object({ //exportando a constante userSchema, que é um objeto criado com a função object do zod, que recebe como parâmetro um objeto com as propriedades do usuário e suas validações
    nome: z.string().min(2).max(100),
    email: z.string().email(),
    senha: z.string().min(6).max(100),
    idade: z.number().min(0)
});

export type UserInput = z.infer<typeof userSchema>; //exportando o tipo UserInput, que é inferido a partir do userSchema, para que possa ser usado para tipar os dados recebidos na requisição e garantir que eles estejam no formato correto