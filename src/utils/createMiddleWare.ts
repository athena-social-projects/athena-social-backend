import {Resolver, GraphQLMiddlewareFunc, Context} from "../types/graphql-utils";

export const createMiddleware = (
    middlewareFunc: GraphQLMiddlewareFunc,
    resolverFunc: Resolver
) => (parent: any, args: any, context: Context, info: any) =>
    middlewareFunc(resolverFunc, parent, args, context, info);
