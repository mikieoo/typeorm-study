import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserModel } from "./user.entity";
import { TagModel } from "./tag.entity";

@Entity()
export class PostModel {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserModel, (user) => user.posts)
    @JoinTable()
    author: UserModel;

    @ManyToMany(() => TagModel, (tag) => tag.posts)
    @JoinTable()
    tags: TagModel[];

    @Column()
    title: string;
}