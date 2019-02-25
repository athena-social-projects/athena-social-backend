import * as bcrypt from "bcryptjs";

import {ResolverMap} from "../../types/graphql-utils";
import {User} from "../../entity/User";
import {invalidLogin, confirmEmailError} from "./errorMessages";

const errorResponse = [
    {
        path: "email",
        message: invalidLogin,
    }
];

export const resolvers: ResolverMap = {
    Query: {
        bye2: () => "bye"
    },
    Mutation: {

        login: async (_, {email, password}: any, {request}) => {
            const user = await User.findOne({where: {email}});

            if (!user) {
                return errorResponse;
            }


            const valid = await bcrypt.compare(password, user.password);

            if (!valid) {
                return errorResponse;
            }

            if (!user.confirmed) {
                return [
                    {
                        path: "email",
                        message: confirmEmailError
                    }
                ];
            }

            // login sucessful
            if (request.session) {
                request.session.userId = user.id;
                request.session.permissions = user.permissions;
            }
            return null;
        }
    }
};
