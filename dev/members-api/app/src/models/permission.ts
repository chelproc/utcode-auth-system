import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PermissionType } from "../settings/permission-type";
import { User } from "./user";

@Entity()
export class Permission extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User)
    @JoinColumn({name: "user_id"})
    user: User;

    @Column({type: "int", nullable: false})
    type: PermissionType;
}