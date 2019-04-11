import {Entity, Column, BaseEntity, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {mediaType} from '../types/mediaTypes';
import {MediaListMedia} from './MediaListMedia';

@Entity('media')
export class Media extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') public id: string;

  @Column('varchar', {length: 255})
  public title: string;

  @Column('varchar', {nullable: false, default: mediaType.MOVIE})
  public type: mediaType;

  @OneToMany((type) => MediaListMedia, (mediaListMedia) => mediaListMedia.media)
  public belongsTo: MediaListMedia[];
}
