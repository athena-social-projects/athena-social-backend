import ping from './ping/resolver';
import me from './me/resolver';
import register from './register/resolver';
import login from './login/resolver';


export const resolvers = {
    Query: {
        ping,
        me,
    },
    Mutation: {
        register,
        login,
    },
};

