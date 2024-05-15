import Joi from 'joi';

export const yourDiarySchema = Joi.object({
  id: Joi.number().required(),
  nickname: Joi.string().required(),
  picture_url: Joi.string().required(),
  title: Joi.string().required(),
  content: Joi.string().required(),
  created_at: Joi.string().isoDate().required(),
  likes: Joi.number().required(),
  tags: Joi.array().items(Joi.number()).required(),
});
