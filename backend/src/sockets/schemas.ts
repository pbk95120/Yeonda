import Joi from 'joi';

export interface PartnerInfo {
  partner_id: number;
  nickname: string;
  picture_url: string;
  user_id: number;
}

export interface RecordChat {
  user_id: number;
  message: string;
  picture_url: string;
  send_at: string;
  is_read: number;
}

export interface ChatInfo {
  partner_id: number;
  nickname: string;
  picture_url: string;
  user_id: number;
  chat: Chat[];
}

export interface Chat {
  user_id: number;
  message: string;
  picture_url: string;
  send_at: string;
  is_read: number;
}

export const authorizationSchema = Joi.object({
  couple_id: Joi.string()
    .pattern(/^[1-9]\d*$/)
    .required(),
  partner_id: Joi.string()
    .pattern(/^[1-9]\d*$/)
    .required(),
});

export const chatMessageSchema = Joi.object({
  couple_id: Joi.string()
    .pattern(/^[1-9]\d*$/)
    .required(),
  message: Joi.string().max(500).required(),
  file: Joi.alternatives().try(
    Joi.string()
      .uri({ scheme: ['data'] })
      .allow(null),
    Joi.allow(null),
  ),
  fileName: Joi.string().optional().allow(null, ''),
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

export const chatExceptCouple = createChatSchema.keys({
  couple_id: Joi.forbidden(),
});

export const chatSchema = Joi.object({
  partner_id: Joi.number().required(),
  nickname: Joi.string().required(),
  picture_url: Joi.string()
    .pattern(/^.+\.(jpg|jpeg|png|webp)$/)
    .allow(null),
  user_id: Joi.number().required(),
  chat: Joi.array().items(chatExceptCouple),
});
