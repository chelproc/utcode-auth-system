import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

@Entity()
export class AuthNewcomer extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => User)
    @JoinColumn({name: "user_id"})
    user: User;

    @Column({type: "varchar", length: 20, nullable: false})
    hash: string;

    @Column({type: "datetime", name: "expire_at", nullable: false})
    expireAt: Date;
}