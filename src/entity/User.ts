import {Entity, Column, BaseEntity, PrimaryGeneratedColumn, BeforeInsert, OneToMany} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import {Gender, userType} from '../types/customTypes';
import {MediaList} from './MediaList';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') public id: string;

  @Column('varchar', {length: 50, name: 'first_name'})
  public firstName: string;

  @Column('varchar', {length: 50, name: 'last_name'})
  public lastName: string;

  @Column('varchar', {nullable: false, length: 255})
  public email: string;

  @Column('text', {nullable: false})
  public password: string;

  @Column('boolean', {default: false})
  public confirmed: boolean;

  @Column('simple-array', {default: []})
  public permissions: string[];

  @Column('varchar', {default: null})
  public gender: Gender;

  @Column('date', {name: 'birth_date', nullable: true})
  public birthDate: Date;

  @Column('date', {name: 'created_at', nullable: false, default: (new Date())})
  public creationDate: Date;

  @Column('varchar', {nullable: false, default: userType.USER})
  public type: userType;

  @OneToMany((type) => MediaList, (list) => list.owner)
  mediaLists: MediaList[];

  @BeforeInsert()
  public async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
