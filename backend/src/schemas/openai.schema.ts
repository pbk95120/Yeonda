import Joi from 'joi';

export const CreateTagSchema = Joi.object({
  tag: Joi.string().required(),
});
