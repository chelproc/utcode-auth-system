import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

@Entity()
export class NotificationEmail extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => User)
    @JoinColumn({name: "user_id"})
    user: User;

    @Column({type: "varchar", length: 255, nullable: false})
    email: string;
}