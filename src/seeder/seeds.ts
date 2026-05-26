import { AppDataSource } from "../banco/connection.js";
import { Seeder } from 'typeorm-extension';
import { User } from '../entity/User.js';

export default class UserSeeder implements Seeder {
    public async run(dataSource: typeof AppDataSource): Promise<void> {
        const userRepository = dataSource.getRepository(User);
        // evitar duplicar dados
        const checkUser = await userRepository.findOneBy({ email: 'castelini@gmail.com' });
        console.log(checkUser);
        if (!checkUser) {
            await userRepository.insert([{
                name: "Matheus Castelini",
                email: "castelini@gmail.com",
                password: "123456",
                age: 25
            },{
                name: "João Silva",
                email: "jao@gmail.com",
                password: "123456",
                age: 30
            }])
        }
    }   
}