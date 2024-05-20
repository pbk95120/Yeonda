import Joi from 'joi';

export const authorizationSchema = Joi.object({
  couple_id: Joi.number().integer().positive().required(),
  partner_id: Joi.number().integer().positive().required(),
});

export const chatMessageSchema = Joi.object({
  couple_id: Joi.number().integer().required(),
  message: Joi.string().max(500).required(),
  file: Joi.alternatives().try(
    Joi.string()
      .uri({ scheme: ['data'] })
      .allow(null),
    Joi.allow(null),
  ),
  fileName: Joi.string().optional().allow(null, ''),
});

export const chatSchema = Joi.object({
  partner_id: Joi.number().required(),
  nickname: Joi.string().required(),
  picture_url: Joi.string()
    .pattern(/^.+\.(jpg|jpeg|png|webp)$/)
    .allow(null),
  user_id: Joi.number().required(),
  chat: Joi.array().items(chatMessageSchema),
});

export const createChatSchema = Joi.object({
  couple_id: Joi.number().integer().positive().required(),
  user_id: Joi.number().integer().positive().required(),
  picture_url: Joi.string()
    .pattern(/^.+\.(jpg|jpeg|png|webp)$/)
    .allow(null),
  message: Joi.string().max(500).required(),
  send_at: Joi.date().iso().required(),
  is_read: Joi.number().valid(0, 1).required(),
});
