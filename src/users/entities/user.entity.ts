import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tasks } from "../../tasks/entity/tasks.entity";
@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id! : number

    @Column({unique:true})
    username! : string;

    @Column()
    email! : string;

    @Column()
    password! : string;

    @OneToMany(type => Tasks , (tasks) => tasks.user)
    tasks? : Tasks[]
}
