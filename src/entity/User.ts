import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('User') // É uma boa prática definir explicitamente o nome da tabela em plural
export class User {
    @PrimaryGeneratedColumn({ type: 'int' })
    id!: number; // Usado '!' para evitar erros de inicialização do TypeScript

    @Column({ type: "varchar", length: 100 })
    name!: string;

    @Column({ type: "varchar", length: 100, unique: true })
    email!: string; 

    @Column({ type: "varchar", length: 100,})
    password!: string;

    @Column({ type: "int" })
    age!: number;

    @CreateDateColumn({ type: "datetime" }) // Mude para "timestamp" se usar PostgreSQL
    created_at!: Date;

    @UpdateDateColumn({ type: "datetime" })
    updated_at!: Date;
}

export default User;
