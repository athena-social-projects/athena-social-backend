import {ResolverMap} from "../../types/graphql-utils";
import {User} from "../../entity/User";
import {UnauthorizedError} from "../../utils/errors";
// import {createMiddleware} from "../../utils/createMiddleware";
// import auth from "../../middlewares/auth";

export const resolvers: ResolverMap = {
    Query: {
        me: (_, __, {request}) => {
            console.log("passed");
            if (request.session && request.session.userId) {
                return User.findOne({where: {id: request.session.userId}});
            }
            throw new UnauthorizedError();
        }
    }
};
