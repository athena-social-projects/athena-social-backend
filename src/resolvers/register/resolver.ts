import {generalPermissions} from '../../types/custom-types';
import {User} from '../../entity/User';
import * as yup from 'yup'; // for object schema validation
import {formatYupError} from '../../utils/formatYupError';
import {
    duplicateEmail,
    emailNotLongEnough,
    invalidEmail,
    passwordNotLongEnough,
} from '../../utils/errorMessages';

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
        .max(255),
});

export default async (
    _: any,
    args: any,
    context: any,
) => {
    const err = await validateSchema(args);
    if (err) {
        return err;
    }
    const {email, password} = args;
    const userAlreadyExists = await User.findOne({
        where: {email},
        select: ['id'], // Only grab/select the 'id' field. This is just a small optimization.
    });

    if (userAlreadyExists) {
        return [
            {
                path: 'email',
                message: duplicateEmail,
            },
        ];
    }

    const user = User.create({
        firstName: 'john',
        lastName: 'doe',
        email,
        password,
        permissions: generalPermissions,
    });

    await user.save();

    return null;
};
