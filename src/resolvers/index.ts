import ping from './ping/resolver';
import me from './me/resolver';
import register from './register/resolver';
import login from './login/resolver';
import mediaSearch from './mediaSearch/resolver';
import mediaId from './mediaId/resolver';
import mediaList from './mediaList/resolver';
import logout from './logout/resolver';

export const resolvers = {
  Query: {
    ping,
    me,
    mediaSearch,
    mediaId,
  },
  Mutation: {
    register,
    login,
    logout,
  },
  User: {
    lists: mediaList,
  },
};

