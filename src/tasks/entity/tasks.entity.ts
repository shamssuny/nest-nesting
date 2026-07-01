import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "../../users/entities/user.entity";

@Entity()
export class Tasks {
    @PrimaryGeneratedColumn()
    id! : number

    @Column()
    name! : string

    @Column()
    details! : string

    @Column({enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED'] , default: 'PENDING'})
    status! : string;

    @Column({nullable: true})
    note! : string;

    @ManyToOne(type => Users, (users) => users.tasks, {onDelete: 'CASCADE'})
    user? : Users
}
