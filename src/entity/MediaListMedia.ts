import {
  Entity,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import {Media} from './Media';
import {MediaList} from './MediaList';

@Entity()
export class MediaListMedia extends BaseEntity {

  // TODO: Add additional columns here such as 'order'.

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
