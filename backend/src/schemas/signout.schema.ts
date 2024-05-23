import { User } from '@models/user.model';
import { Logon } from '@schemas/login.schema';

export interface Signout extends Logon {
  password: User['password'];
}
