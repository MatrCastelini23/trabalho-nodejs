export class AppError extends Error { 
    public readonly statusCode: number;
    public readonly message: string;
    
    constructor (message: string, statusCode: number){
        super(message); //chama o construrtor da classe base (Error)
        this.name = "AppError"; // Define o nome do erro para o nome da sua classe personalizada 
        this.message = message; // Define a mensagem de erro personalizada
        this.statusCode = statusCode; // Define o código de status HTTP para o erro 
        
        //mantem o stack trace correto no Node.js
        Error.captureStackTrace(this, this.constructor);
    }
     
}