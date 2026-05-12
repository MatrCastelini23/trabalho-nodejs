import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({ type: "varchar" })
    nome: string | undefined;

    @Column({ type: "varchar" })
    email: string | undefined;

    @Column({ type: "varchar" })
    senha: string | undefined;

    @Column({ type: "int" })
    idade: number | undefined;

    @Column({ type: "datetime" })
    createdAt: Date | undefined;

    @Column({ type: "datetime" })
    updatedAt: Date | undefined;
}

export default User;