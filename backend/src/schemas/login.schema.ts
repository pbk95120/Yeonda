import Joi from 'joi';

export interface Login {
  email: string;
  password: string;
}

export const LoginSchema = Joi.object({
  email: Joi.string().email().max(320).required(),
  password: Joi.string().max(20).required(),
});
