import Joi from 'joi';

export const getPartnerInfoSchema = Joi.object({
  partner_id: Joi.number().integer().positive().required(),
  nickname: Joi.string().max(100).required(),
  picture_url: Joi.string().max(100).allow(null),
  user_id: Joi.number().integer().positive().required(),
});

export const getRecordChatSchema = Joi.object({
  user_id: Joi.number().integer().positive().required(),
  message: Joi.string().required(),
  picture_url: Joi.string().max(100).allow(null),
  send_at: Joi.date().iso().required(),
  is_read: Joi.number().valid(0, 1).required(),
});

export const createChatSchema = Joi.object({
  user_id: Joi.number().integer().positive().required(),
  message: Joi.string().required(),
  picture_url: Joi.string().max(100).allow(null),
  send_at: Joi.date().iso().required(),
  is_read: Joi.number().valid(0, 1).required(),
});

export const authorizationSchema = Joi.object({
  user_id: Joi.number().integer().positive().required(),
  partner_id: Joi.number().integer().positive().required(),
});
