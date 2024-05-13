import Joi from 'joi';

export interface statistic {
  today: number;
  weekly_diary_count: [number, number, number, number, number, number, number];
  weekly_matching_count: [number, number, number, number, number, number, number];
  weekly_user_count: [number, number, number, number, number, number, number];
}

export const statisticSchema = Joi.object({
  today: Joi.number().integer().min(0).max(6).required(),
  weekly_diary_count: Joi.array().items(Joi.number().integer().min(0)).length(7).required(),
  weekly_matching_count: Joi.array().items(Joi.number().integer().min(0)).length(7).required(),
  weekly_user_count: Joi.array().items(Joi.number().integer().min(0)).length(7).required(),
});