import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

@Entity()
export class AuthGoogle extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => User)
    @JoinColumn({name: "user_id"})
    user: User;

    @Column({type: "varchar", length: 255, nullable: false})
    email: string;

    @Column({type: "varchar", name: "profile_id", length: 30, nullable: false})
    profileId: string;
}
