import {UnauthorizedError} from '../../utils/errors';

export default async (_: any, __: any, context: any) => {
  if (context.req.session && context.req.session.userId) {
    let error: Error;
    await context.req.session.destroy((err: Error) => {
      error = err;
    });
    if (error) {
      return error;
    }
    return null;
  }
  throw new UnauthorizedError();
};
