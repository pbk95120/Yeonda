import { PasswordSchema } from '@schemas/signup.schema';
import Joi from 'joi';

export interface PasswordResetRequest {
  email: string;
}

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

export interface PasswordResetConfirm {
  password: string;
  password_check: string;
}

export const PasswordResetConfirmSchema = Joi.object<PasswordResetConfirm>({
  password: PasswordSchema,
  password_check: Joi.string().valid(Joi.ref('password')).required(),
});
