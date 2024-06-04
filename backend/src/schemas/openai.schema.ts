import { LogonSchema } from '@schemas/login.schema';
import Joi from 'joi';

export const CreateTagSchema = LogonSchema.concat(
  Joi.object({
    tag: Joi.string().max(50).required(),
  }),
);
