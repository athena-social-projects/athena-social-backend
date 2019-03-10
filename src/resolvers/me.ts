import {User} from '../entity/User';
import {UnauthorizedError} from '../utils/errors';

export default async (_: any, __: any, context: any) => {
    if (context.req.session && context.req.session.userId) {
        return await User.findOne({where: {id: context.req.session.userId}});
    }
    throw new UnauthorizedError();
};
