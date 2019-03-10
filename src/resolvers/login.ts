import * as bcrypt from 'bcryptjs';
import {User} from '../entity/User';
import {confirmEmailError} from '../utils/errorMessages';
import {InvalidLogin} from '../utils/errors';


export default async (_: any, {email, password}: any, context: any) => {
    const user = await User.findOne({where: {email}});

    if (!user) {
        return InvalidLogin;
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
        return InvalidLogin;
    }

    // Reverse this boolean check once email confirmation is working
    if (user.confirmed) {
        return [
            {
                path: 'email',
                message: confirmEmailError,
            },
        ];
    }

    // login successful
    const session = context.req.session;
    if (session) {
        session.userId = user.id;
        session.permissions = user.permissions;
    }
    return user;
};
