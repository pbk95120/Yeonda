import Joi from 'joi';

export const updateCoupleSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

export const getPartnerInfoSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
  uid: Joi.number().integer().positive().required(),
  nickname: Joi.string().max(100).required(),
  picture_url: Joi.string().max(100),
});

export const getRecordChatSchema = Joi.object({
  user_id: Joi.number().integer().positive().required(),
  message: Joi.string().required(),
  file: Joi.string().max(100),
  send_at: Joi.date().iso().default('now').required(),
  is_read: Joi.boolean().required(),
});

export const createChatSchema = Joi.object({
  couple_id: Joi.number().integer().positive().required(),
  user_id: Joi.number().integer().positive().required(),
  picture_url: Joi.string().max(100),
  message: Joi.string().required(),
  is_read: Joi.boolean().required(),
  create_at: Joi.date().iso().default('now').required(),
});
