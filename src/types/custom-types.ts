import {Redis} from 'ioredis';
import {Request} from 'apollo-server-express';
import {Session} from 'inspector';

export interface IMovie {
  vote_count: number;
  id: number;
  video: boolean;
  vote_average: number;
  title: string;
  popularity: number;
  poster_path: string;
  original_language: string;
  original_title: string;
  backdrop_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
}

export interface IMedia {
  id: string;
  name: string;
  type: string;
}

export interface IAlbum {
  spotify: string;
  href: string;
  id: string;
  title: string;
  name: string;
  release_date: string;
  total_tracks: number;
  uri: string;
  album_type: string;
  type: string;
}

export interface ISession extends Session {
    userId?: string;
}

export interface IApolloSession extends ISession {
    permissions: string[];
    userId: string;
}

export interface IApolloRequest extends Request {
    session: IApolloSession;
}
export const enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other',
}

export const enum userType {
    USER = 'user',
    ADMIN = 'admin',
}

export const generalPermissions = [
    'read:comment',
    'write:comment',
    'read:review',
    'read:permissions',
    'write:review',
    'write:message',
];

export interface IApolloContext {
    redis: Redis;
    req: IApolloRequest;
}
