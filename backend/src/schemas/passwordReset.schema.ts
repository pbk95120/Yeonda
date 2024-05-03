import Joi from 'joi';

export interface PasswordResetRequest {
  email: string;
}

export const PasswordResetRequestSchema = Joi.object({
  email: Joi.string().email().max(320).required(),
});

export interface PasswordResetVerify extends PasswordResetRequest {
  validate: string;
}
