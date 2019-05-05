import {
  Column,
  Entity,
  BaseEntity,
  ManyToOne, BeforeInsert,
} from 'typeorm';
import {Media} from './Media';
import {MediaList} from './MediaList';

@Entity()
export class MediaListItem extends BaseEntity {

  // TODO: make this non-nullable and figure out how to set it.
  @Column('integer', {nullable: true})
  public order: number;

  @ManyToOne((type) => MediaList, (list) => list.items, {
    primary: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  public list: MediaList;

  @ManyToOne((type) => Media, (media) => media.belongsTo, {
    primary: true,
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  public media: Media;
}
