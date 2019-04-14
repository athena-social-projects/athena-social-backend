import {
  Entity,
  Column,
  BaseEntity,
  ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import {User} from './User';
import {MediaListMedia} from './MediaListMedia';

@Entity()
export class MediaList extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') public id: string;

  @Column('varchar', {length: 50})
  public title: string;

  @Column('boolean', {default: false})
  public public: boolean;

  @Column('date', {name: 'created_at', nullable: false, default: (new Date())})
  public creationDate: Date;

  @ManyToOne((type) => User, (user) => user.lists, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  public owner: User;

  @OneToMany((type) => MediaListMedia, (media) => media.list, {eager: true})
  public items: MediaListMedia[];
}
