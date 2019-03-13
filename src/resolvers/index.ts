import ping from './ping/resolver';
import me from './me/resolver';
import register from './register/resolver';
import login from './login/resolver';
import media from './media/resolver';


export const resolvers = {
  Query: {
    ping,
    me,
    media,
  },
  Mutation: {
    register,
    login,
  },
};

