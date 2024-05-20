import Joi from 'joi';

export const selectDiarySchemas = Joi.object({
  currentPage: Joi.string()
    .pattern(/^[1-9]\d*$/)
    .required(),
  limit: Joi.string()
    .pattern(/^[1-9]\d*$/)
    .required(),
  sort: Joi.string()
    .pattern(/^[1-9]\d*$/)
    .required(),
});

export const diaryIdSchemas = Joi.number().integer().positive().required();

export const updateDiarySchemas = Joi.object({
  id: Joi.number().integer().positive().required(),
  title: Joi.string().min(1).max(100).required(),
  content: Joi.string().min(1).max(3000).required(),
});
