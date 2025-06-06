import { ChildEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, TableInheritance, UpdateDateColumn } from "typeorm";

@Entity()
export class BaseModel {
    @PrimaryGeneratedColumn()
    id: number;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    upatedAt: Date;
}

@Entity()
export class BookModel extends BaseModel {
    @Column()
    name: string;
}

@Entity()
export class CarModel extends BaseModel {
    @Column()
    brand: string;
}

@Entity()
@TableInheritance({
    column: {
        name: 'type',
        type: 'varchar'
    }
})
export class SingleBaseModel {
    @PrimaryGeneratedColumn()
    id: number;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    upatedAt: Date;
}

@ChildEntity()
export class ComputerModel extends SingleBaseModel {
    @Column()
    brand: string;
}

@ChildEntity()
export class AirplaneModel extends SingleBaseModel {
    @Column()
    country: string;
}