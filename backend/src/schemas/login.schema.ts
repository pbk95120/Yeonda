import { User } from '@models/user.model';
import { EmailSchema, PasswordSchema } from '@schemas/signup.schema';
import { UserIDSchema } from '@schemas/yourProfile.schema';
import Joi from 'joi';

export interface Login extends Pick<User, 'email' | 'password'> {}

export const LoginSchema = Joi.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export interface Logon extends Pick<User, 'email'> {
  user_id: User['id'];
}

export const LogonSchema = Joi.object({
  user_id: UserIDSchema,
  email: EmailSchema,
});
