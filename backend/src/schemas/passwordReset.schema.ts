import { Password_Reset } from '@models/password_reset.model';
import { User } from '@models/user.model';
import { EmailSchema, PasswordSchema } from '@schemas/signup.schema';
import { UserIDSchema } from '@schemas/yourProfile.schema';
import Joi from 'joi';

export const Random6CodeSchema = Joi.string()
  .pattern(/^[A-Z\d]{6}$/)
  .length(6)
  .required();

export interface VerifyCode extends Pick<User, 'email'>, Pick<Password_Reset, 'code'> {}

export const VerifyCodeSchema = Joi.object({
  email: EmailSchema,
  code: Random6CodeSchema,
});

export interface PasswordConfirm extends Pick<User, 'password'> {
  password_check: string;
}

export const PasswordConfirmSchema = Joi.object({
  user_id: UserIDSchema,
  email: EmailSchema,
  password: PasswordSchema,
  password_check: Joi.string().valid(Joi.ref('password')).required(),
});
