import { Column, CreateDateColumn, Entity, Generated, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { ProfileModel } from "./profile.entity";
import { PostModel } from "./post.entity";

export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

@Entity()
export class UserModel {
    // ID
    // 자동으로 ID를 생성한다.
    // @PrimaryGeneratedColumn()
    // Primary Column은 모든 테이블에서 기본적으로 존재해야한다.
    // 테이블 안에서 각각의 Row를 구분할 수 있는 칼럼이다.
    // @PrimaryColumn
    //
    // PrimaryGeneratedColumn -> 순서대로 위로 올라간다.
    // 1, 2, 3, 4, 5 -> 999909
    // 
    // UUID
    // askjfdhksjfh-lalsdfjlk123-sdsfslkfj235-sldkfjsfdk1241
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    // @Column({
    //     // 데이터베이스 칼럼 이름
    //     // 프로퍼티 이름으로 자동 유추됨
    //     name: 'title',
    //     // 값의 길이
    //     // 입력할 수 있는 글자의 길이가 300
    //     length: 300,
    //     // null이 가능한지
    //     nullable: true,
    //     // true면 처음 저장할때만 값 지정 가능
    //     // 이후에는 값 변경 불가능
    //     update: true,
    //     // find()를 실행할 때 기본으로 값을 불러올지
    //     // 기본값이 true,
    //     select: false,
    //     // 기본 값
    //     // 아무것도 입력 안했을때 기본으로 입력하게 되는 값
    //     default: 'default value',
    //     // 칼럼중에서 유일무이한 값이 돼야하는지
    //     unique: true,
    // })
    // title: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER, 
    })
    role: Role;

    // 데이터 생성 일자
    // 데이터가 생성되는 날짜와 시간이 자동으로 찍힌다.
    @CreateDateColumn()
    createdAt: Date;

    // 데이터 업데이트
    // 데이터가 업데이트되는 날짜와 시간이 자동으로 찍힌다.
    @UpdateDateColumn()
    updatedAt: Date;

    // 데이터가 업데이트 될때마다 1씩 올라간다.
    // 처음 생성되면 값은 1이다.
    // save() 함수가 몇번 불렸는지 기억한다.
    @VersionColumn()
    version: number;

    @Column()
    @Generated('increment')
    additionId: number

    @OneToOne(() => ProfileModel, (profile) => profile.user, {
        // find() 실행 할때마다 항상 같이 가져올 relation
        eager: false,
        // 저장할 때 relation을 한번에 같이 저장 가능 (기본값 false = 저장 X)
        cascade: false,
        // null이 가능한지
        nullable: true,
        // 관계가 삭제 됐을 때 
        // no action -> 아무것도 안함
        // cascade -> 참조하는 row도 같이 삭제
        // set null -> 참조하는 row에서 참조 id를 null로 변경
        // set default -> 기본 세팅으로 설정 (테이블의 기본 세팅)
        // restrict -> 참조하고 있는 row가 있는 경우 참조 당하는 row 삭제 불가
        onDelete: 'NO ACTION'
    })
    profile: ProfileModel;

    @OneToMany(() => PostModel, (post) => post.author)
    posts: PostModel[];

    @Column({default: 0})
    count: number;
}