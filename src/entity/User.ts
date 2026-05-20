import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users') // É uma boa prática definir explicitamente o nome da tabela em plural
export class User {
    @PrimaryGeneratedColumn({ type: 'int' })
    id!: number; // Usado '!' para evitar erros de inicialização do TypeScript

    @Column({ type: "varchar", length: 100 })
    nome!: string;

    @Column({ type: "varchar", length: 100, unique: true })
    email!: string; 

    @Column({ type: "varchar", length: 100,})
    senha!: string;

    @Column({ type: "int" })
    idade!: number;

    @CreateDateColumn({ type: "datetime" }) // Mude para "timestamp" se usar PostgreSQL
    createdAt!: Date;

    @UpdateDateColumn({ type: "datetime" })
    updatedAt!: Date;
}

export default User;
