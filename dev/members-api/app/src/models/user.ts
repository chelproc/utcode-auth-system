import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn } from "typeorm";
import { Request } from "express";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 20, nullable: false})
    username: string;

    @Column({type: "varchar", length: 20, nullable: false})
    nickname: string;

    @Column({type: "varchar", length: 30, nullable: false})
    fullname: string;

    @Column({type: "varchar", length: 40, nullable: false})
    affiliation: string;

    @Column({type: "date", name: "joined_at"})
    joinedAt: string;
}

export type RequestWithUser = Omit<Request, "user"> & {
    user?: User
}