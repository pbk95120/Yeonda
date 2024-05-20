import Joi from 'joi';

export const selectDiarySchemas = Joi.object({
  currentPage: Joi.string()
    .pattern(/^[1-9]\d*$/)
    .required(),
  limit: Joi.string()
    .pattern(/^[1-9]\d*$/)
    .required(),
  id: Joi.number().integer().positive().required(),
});

export const diaryIdSchemas = Joi.object({
  id: Joi.string()
    .pattern(/^[1-9]\d*$/)
    .required(),
  diary_id: Joi.string()
    .pattern(/^[1-9]\d*$/)
    .required(),
});

export const yourDiarySchema = Joi.object({
  id: Joi.number().required(),
  nickname: Joi.string().required(),
  picture_url: Joi.string().required(),
  title: Joi.string().min(1).max(100).required(),
  content: Joi.string().min(1).max(3000).required(),
  created_at: Joi.string().isoDate().required(),
  likes: Joi.number().required(),
  tags: Joi.array().items(Joi.number()).required(),
});

export const yourDiaryListSchema = Joi.array().items(yourDiarySchema);
