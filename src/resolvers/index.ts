import ping from './ping';
import me from './me';
import register from './register';
import login from './login';


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

