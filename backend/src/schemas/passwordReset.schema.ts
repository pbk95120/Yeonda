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
