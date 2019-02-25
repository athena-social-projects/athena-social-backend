import {verifyLoggedIn} from "../utils/checkLoggedIn"
import {UnauthorizedError} from "../utils/errors";

// Resolvers for our custom directives
export const directiveResolvers = {
    Authenticate: async (next: any, source: any, args: any, context: any) => {
        // User isn't logged in
        verifyLoggedIn(context.request.session);
        console.log("User authenticated.");
        await next();
    },

    hasPermissions: async (next: any, source: any, args: any, context: any) => {
        const expectedPermissions = args.permissions;
        const userPermissions = context.request.session.permissions;
        // TRUE if expectedPermissions are not a subset of the existing userPermissions
        if (expectedPermissions.every((val: any) => userPermissions.indexOf(val) === -1)){
            throw new UnauthorizedError();
        }
        console.log("User has required permissions");
        await next();
    }
};

