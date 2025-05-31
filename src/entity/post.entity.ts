import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserModel } from "./user.entity";

@Entity()
export class PostModel {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserModel, (user) => user.posts)
    @JoinColumn()
    author: UserModel;

    @Column()
    title: string;
}