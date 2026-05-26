import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableUser1779796979780 implements MigrationInterface {
    // comando up cria a tabela uma vez
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "User",
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "email",
                        type: "varchar",
                    },
                    {
                        name: "password",
                        type: "varchar",
                    },
                    {
                        name: "age",
                        type: "integer",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },{
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    }
                ],
            })
        )
    }
    // comando down desfaz a criação da tabela, caso seja necessário reverter a migração
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("Users");
    }

}
