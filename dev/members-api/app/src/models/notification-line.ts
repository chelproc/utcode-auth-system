import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { User } from "./user";

@Entity()
export class NotificationLine extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => User)
    @JoinColumn({name: "user_id"})
    user: User;

    @Column({type: "varchar", name: "access_token", length: 60, nullable: false})
    accessToken: string;
    
    @Column({type: "varchar", length: 25, nullable: false})
    target: string;
}