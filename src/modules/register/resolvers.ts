import {ResolverMap} from "../../types/graphql-utils";
import {User} from "../../entity/User";
import * as yup from 'yup'; // for object schema validation
import {formatYupError} from "../../utils/formatYupError";
import {
    duplicateEmail,
    emailNotLongEnough,
    invalidEmail,
    passwordNotLongEnough
} from "./errorMessages";
// import {createConfirmEmailLink} from "../../utils/createConfirmEmailLink";
// import {sendConfirmationEmail} from "../../utils/sendConfirmationEmail";

const validateSchema = async (args: any): Promise<any> => {
    try {
        await schema.validate(args, {abortEarly: false});
    } catch (err) {
        return formatYupError(err);
    }
};
const schema = yup.object().shape({
    email: yup
        .string()
        .min(3, emailNotLongEnough)
        .max(255)
        .email(invalidEmail),
    password: yup
        .string()
        .min(3, passwordNotLongEnough)
        .max(255)
});

export const resolvers: ResolverMap = {
    Query: {
        bye: () => "bye"
    },
    Mutation: {
        register: async (
            _,
            // TODO: Change type hint to GQL.IRegisterOnMutationArguments
            args: any,
            // {redis, url}
        ) => {

            await validateSchema(args);

            const {email, password} = args;
            const userAlreadyExists = await User.findOne({
                where: {email},
                select: ["id"] // Only grab/select the 'id' field. This is just a small optimization.
            });

            if (userAlreadyExists) {
                return [
                    {
                        path: "email",
                        message: duplicateEmail
                    }
                ];
            }

            const user = User.create({
                first_name: "john",
                last_name: "doe",
                email: email,
                password: password
            });

            await user.save();

            // await sendConfirmationEmail(email, await createConfirmEmailLink(url, user.id, redis));

            return null;
        }
    }
};
