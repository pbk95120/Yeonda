import { PasswordSchema } from '@schemas/signup.schema';
import { User } from '@src/models/user.model';
import Joi from 'joi';

export interface PasswordResetRequest extends Pick<User, 'email'> {}

export const PasswordResetRequestSchema = Joi.object({
  email: Joi.string().email().max(320).required(),
});

export interface PasswordResetVerify extends PasswordResetRequest {
  code: string;
}

export const PasswordResetVerifySchema = PasswordResetRequestSchema.keys({
  code: Joi.string()
    .pattern(/^[A-Z\d]{6}$/)
    .length(6)
    .required(),
});

export interface PasswordConfirm extends Pick<User, 'password'> {
  password_check: string;
}

export const PasswordConfirmSchema = Joi.object<PasswordConfirm>({
  password: PasswordSchema,
  password_check: Joi.string().valid(Joi.ref('password')).required(),
});
