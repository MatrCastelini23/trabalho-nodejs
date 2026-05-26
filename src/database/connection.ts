//importe chama o construtor do banco de dados, para criar a conexão com o banco de dados(DataSource)
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
//importa a entidade User para o banco de dados, para que possa ser usada na conexão do banco de dados. Atenção no caminho das pastas.
import { User } from '../entity/User.js';

//variavel connection recebe qual banco e qual o caminho do banco de dados. Atenção no caminho das pastas.
// options alterado para trabalhar com o seeds
const options: DataSourceOptions & SeederOptions = {
    type: 'sqlite',
    database: 'src/database/database.sqlite',
    // synchronize: true, retirado para usar as migrations 
    entities: [User], //importa a entidade User para o banco de dados
    migrations: ['src/migration/*.ts'], //importa as migrations para o db, * indica todos os arquivos .ts dentro da pasta migration
    migrationsRun: true, 
};

export const AppDataSource = new DataSource(options); 