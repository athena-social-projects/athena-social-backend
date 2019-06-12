import {AuthenticateDirective} from './auth/AuthenticateDirective';
import {HasPermissionsDirective} from './auth/HasPermissionsDirective';
import {TransformLists} from './auth/TransformLists';

export const schemaDirectives = {
  Authenticate: AuthenticateDirective,
  hasPermissions: HasPermissionsDirective,
  transformLists: TransformLists,
};
