import "reflect-metadata";
import { AppDataSource } from "../data-source.js";
import { User } from '../../entity/User.js';

async function runSeeder() {
    const userRepository = AppDataSource.getRepository(User);
    const users = userRepository.create([
        {
            name: 'João Silva',
            email: 'jao@gmail.com',
            password: '123456',
            age: 30
        },
        {
            name: 'Matheus Castelini',
            email: 'castelini@gmail.com',
            password: '123456',
            age: 25
        }
    ]);
    
    const existingUsers = await userRepository.findBy({email: 'jao@gmail.com'});
    if (existingUsers.length) {
        console.log("Usuário já existe, pulando seeder.");
        return;
    }else {
        await userRepository.save(users);
    }
}

AppDataSource.initialize()
    .then(async () => {
        console.log("Conexão com o banco de dados estabelecida com sucesso");
        await runSeeder();
        console.log("Seeders executados com sucesso");
        process.exit(0); // Encerra o processo após a execução dos seeders
    })
    .catch((error) => {
        console.error("Erro ao estabelecer conexão com o banco de dados:", error);
        process.exit(1); // Encerra o processo com código de erro
    });