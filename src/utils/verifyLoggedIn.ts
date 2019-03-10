import {ISession} from '../types/custom-types';
import {UnauthorizedError} from './errors';

export default (session: ISession) => {
    if (!session || !session.userId) {
        return new UnauthorizedError();
    }
};
