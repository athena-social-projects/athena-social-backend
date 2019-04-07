import {ISession} from '../types/customTypes';
import {UnauthorizedError} from './errors';

export default (session: ISession) => {
  if (!session || !session.userId) {
    return new UnauthorizedError();
  }
};
