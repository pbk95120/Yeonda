import Joi from 'joi';

export interface Tag {
  id: number;
  name: string;
  vector: string;
}

export interface TagName extends Omit<Tag, 'vector'> {}

export const TagNameSchema = Joi.array().items(
  Joi.object({
    id: Joi.number().integer().positive().strict().required(),
    name: Joi.string().max(50).required(),
  }),
);
