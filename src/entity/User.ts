import {Entity, Column, BaseEntity, PrimaryGeneratedColumn, BeforeInsert} from "typeorm";
import * as bcrypt from "bcryptjs";
import {Gender, userType} from "../types/graphql-utils";

@Entity("users")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid") id: string;

    @Column("varchar", {length: 50, name: 'first_name'})
    firstName: string;

    @Column("varchar", {length: 50, name: 'last_name'})
    lastName: string;

    @Column("varchar", {nullable: false, length: 255})
    email: string;

    @Column("text", {nullable: false})
    password: string;

    @Column("boolean", {default: false})
    confirmed: boolean;

    @Column("simple-array", {default: []})
    permissions: Array<String>;

    @Column("varchar", {default: null})
    gender: Gender;

    @Column("date", {name: 'birth_date', nullable: true})
    birthDate: Date;

    @Column("date", {name: 'created_at', nullable: false, default: (new Date())})
    creationDate: Date;

    @Column("varchar", {nullable: false, default: userType.USER})
    type: userType;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
