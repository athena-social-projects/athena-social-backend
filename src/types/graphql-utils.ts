import {Redis} from "ioredis";
import {Request} from "express";

export interface Session {
    userId?: string;
}

export interface Context {
    redis: Redis;
    request: Request;
}

export const enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other'
}

export const enum userType {
    USER = 'user',
    ADMIN = 'admin'
}

export const general_permissions = [
    "read:comment",
    "write:comment",
    "read:review",
    "write:review",
    "write:message"
];
export type Resolver = (
    parent: any,
    args: any,
    context: Context,
    info: any
) => any;

export type GraphQLMiddlewareFunc = (
    resolver: Resolver,
    parent: any,
    args: any,
    context: Context,
    info: any
) => any;

export interface ResolverMap {
    [key: string]: {
        [key: string]: (parent: any, args: any, context: Context, info: any) => any;
    };
}
