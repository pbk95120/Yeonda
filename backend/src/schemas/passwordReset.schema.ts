import { User } from '@models/user.model';
import { EmailSchema, PasswordSchema } from '@schemas/signup.schema';
import Joi from 'joi';

export const Random6CodeSchema = Joi.string()
  .pattern(/^[A-Z\d]{6}$/)
  .length(6)
  .required();

export const VerifyCodeSchema = Joi.object({
  email: EmailSchema,
  code: Random6CodeSchema,
});

export interface PasswordConfirm extends Pick<User, 'password'> {
  password_check: string;
}

export const PasswordConfirmSchema = Joi.object({
  email: EmailSchema,
  password: PasswordSchema,
  password_check: Joi.string().valid(Joi.ref('password')).required(),
});
