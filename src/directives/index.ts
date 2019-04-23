import {AuthenticateDirective} from './auth/AuthenticateDirective';
import {HasPermissionsDirective} from './auth/HasPermissionsDirective';

export const schemaDirectives = {
  Authenticate: AuthenticateDirective,
  hasPermissions: HasPermissionsDirective,
};
