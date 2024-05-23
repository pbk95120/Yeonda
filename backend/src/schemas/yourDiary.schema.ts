import Joi from 'joi';

export interface yourDiaryResults {
  id: number;
  nikname: string;
  picture_url: string | null;
  title: string;
  content: string;
  created_at: string;
  likes: number;
  tags: { id: number; name: string }[];
}

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
  picture_url: Joi.string().allow(null).required(),
  title: Joi.string().min(1).max(100).required(),
  content: Joi.string().min(1).max(3000).required(),
  created_at: Joi.string().isoDate().required(),
  likes: Joi.number().required(),
  tags: Joi.array().items(
    Joi.object({
      id: Joi.number().integer().positive().strict().allow(null).required(),
      name: Joi.string().max(50).allow(null).required(),
    })
      .allow(null)
      .min(0)
      .required(),
  ),
});

export const yourDiaryListSchema = Joi.array().items(yourDiarySchema);
