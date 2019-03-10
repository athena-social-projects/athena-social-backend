import verifyLoggedIn from '../../utils/verifyLoggedIn';
import {SchemaDirectiveVisitor} from 'apollo-server-express';
import {defaultFieldResolver} from 'graphql';

export class AuthenticateDirective extends SchemaDirectiveVisitor {
    public visitFieldDefinition(field: any) {
        const {resolve = defaultFieldResolver} = field;
        field.resolve = async (...args: any) => {
            verifyLoggedIn(args[2].req.session);
            return await resolve.apply(this, args);
        };
    }
}
