import {Redis} from 'ioredis';
import {Request} from 'apollo-server-express';
import {Session} from 'inspector';

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
