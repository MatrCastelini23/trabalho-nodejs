//importe chama o construtor do banco de dados, para criar a conexão com o banco de dados(DataSource)
import { DataSource } from 'typeorm';
//importa a entidade User para o banco de dados, para que possa ser usada na conexão do banco de dados. Atenção no caminho das pastas.
import { User } from '../entity/User.js';

//variavel connection recebe qual banco e qual o caminho do banco de dados. Atenção no caminho das pastas.
// options alterado para trabalhar com o seeds
export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: './src/database/database.sqlite',
    entities: [User],
    synchronize: false, // desabilita a sincronização automática do banco de dados, para evitar perda de dados em produção
    logging: false, // desabilita os logs de consulta SQL no console
    migrations: ['./src/database/migrations/*.ts'], // caminho para as migrações
    migrationsRun: true, // executa as migrações automaticamente ao iniciar a aplicação
});


export default AppDataSource; 