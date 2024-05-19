import Joi from 'joi';

export const authorizationSchema = Joi.object({
  couple_id: Joi.number().integer().positive().required(),
  partner_id: Joi.number().integer().positive().required(),
});

export const chatMessageSchema = Joi.object({
  user_id: Joi.number().required(),
  message: Joi.string().required(),
  picture_url: Joi.string().allow(null).optional(),
  send_at: Joi.string().isoDate().required(),
  is_read: Joi.number().valid(0, 1).required(),
});

export const chatSchema = Joi.object({
  partner_id: Joi.number().required(),
  nickname: Joi.string().required(),
  picture_url: Joi.string().allow(null).optional(),
  user_id: Joi.number().required(),
  chat: Joi.array().items(chatMessageSchema),
});

export const createChatSchema = Joi.object({
  couple_id: Joi.number().integer().positive().required(),
  user_id: Joi.number().integer().positive().required(),
  picture_url: Joi.string().allow(null).optional(),
  message: Joi.string().required(),
  send_at: Joi.date().iso().required(),
  is_read: Joi.number().valid(0, 1).required(),
});
