//importe chama o construtor do banco de dados, para criar a conexão com o banco de dados(DataSource)
import { DataSource, DataSource as Typeorm } from 'typeorm';
//importa a entidade User para o banco de dados, para que possa ser usada na conexão do banco de dados. Atenção no caminho das pastas.
import { User } from '../entity/User.js';

//variavel connection recebe qual banco e qual o caminho do banco de dados. Atenção no caminho das pastas.
export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: './src/banco/database.sqlite',
    synchronize: true, //sincroniza o banco de dados com as entidades do projeto
    logging: true,
    entities: [User], //importa a entidade User para o banco de dados
    subscribers: [],
    migrations: [],
});

export default AppDataSource; //exporta a conexão do banco de dados para ser usada em outros arquivos do projeto, como o server.ts, para estabelecer a conexão com o banco de dados.