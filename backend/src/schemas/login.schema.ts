import { User } from '@models/user.model';
import { EmailSchema, PasswordSchema } from '@schemas/signup.schema';
import Joi from 'joi';

export interface Login extends Pick<User, 'email' | 'password'> {}

export const LoginSchema = Joi.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export interface Logon extends Pick<User, 'email'> {
  user_id: User['id'];
}
