import { User } from '@src/models/user.model';
import Joi from 'joi';

export interface Login extends Pick<User, 'email' | 'password'> {}

export const LoginSchema = Joi.object({
  email: Joi.string().email().max(320).required(),
  password: Joi.string().max(20).required(),
});
