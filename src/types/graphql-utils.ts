import {Redis} from "ioredis";

export interface Session {
    userId?: string;
}

export interface Context {
    redis: Redis;
    url: string;
    session: Session;
}

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
        [key: string]: (parent: any, args: any, context: { redis: Redis, url: string, session: Session }, info: any) => any;
    };
}
