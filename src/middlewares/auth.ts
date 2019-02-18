import {Context, Resolver} from "../types/graphql-utils";

export default async (
    resolver: Resolver,
    parent: any,
    args: any,
    context: Context,
    info: any
) => {

    // User isn't logged in
    if (!context.session || !context.session.userId) {
        return null;
    }
    const result = await resolver(parent, args, context, info);

    return result;
};
