import {UnauthorizedError} from '../../utils/errors';
import {SchemaDirectiveVisitor} from 'apollo-server-express';
import {defaultFieldResolver} from 'graphql';

export class HasPermissionsDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field: any) {
    const {resolve = defaultFieldResolver} = field;
    field.resolve = async (...args: any) => {
      const expectedPermissions = this.args.permissions;
      const userPermissions = args[2].req.session.permissions;
      // TRUE if expectedPermissions are not a subset of the existing userPermissions
      if (expectedPermissions.every((val: any) => userPermissions.indexOf(val) === -1)) {
        throw new UnauthorizedError();
      }
      return await resolve.apply(this, args);
    };
  }
}
