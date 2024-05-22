import Joi from 'joi';

export interface PartnerInfo {
  partner_id: number;
  nickname: string;
  picture_url: string | null;
  user_id: number;
}

export interface RecordChat {
  user_id: number;
  message: string;
  picture_url: string | null;
  send_at: string;
}

export interface Chat extends RecordChat {
  id: number;
  show_date: boolean;
}

export interface ChatInfo extends PartnerInfo {
  chat: Chat[];
}

export const authorizationSchema = Joi.object({
  couple_id: Joi.string()
    .pattern(/^[1-9]\d*$/)
    .required(),
  user1_id: Joi.string()
    .pattern(/^[1-9]\d*$/)
    .required(),
  user2_id: Joi.string()
    .pattern(/^[1-9]\d*$/)
    .required(),
});

const chatItem = Joi.object({
  id: Joi.number().integer().positive().required(),
  user_id: Joi.number().integer().positive().required(),
  picture_url: Joi.string()
    .pattern(/^.+\.(jpg|jpeg|png|webp)$/)
    .allow(null),
  message: Joi.string().max(500).required(),
  send_at: Joi.date().iso().required(),
  show_date: Joi.boolean().required(),
});

export const chatSchema = Joi.object({
  partner_id: Joi.number().required(),
  nickname: Joi.string().required(),
  picture_url: Joi.string()
    .pattern(/^.+\.(jpg|jpeg|png|webp)$/)
    .allow(null),
  user_id: Joi.number().required(),
  chat: Joi.array().items(chatItem),
});

export const chatMessageSchema = Joi.object({
  couple_id: Joi.string()
    .pattern(/^[1-9]\d*$/)
    .required(),
  message: Joi.string().max(500).required(),
  file: Joi.object({
    base64: true,
    allowMime: ['image/jpeg', 'image/png', 'image/webp'],
  })
    .allow(null)
    .required(),
  fileName: Joi.string()
    .pattern(/^.+\.(jpg|jpeg|png|webp)$/)
    .allow(null)
    .required(),
});

export const createChatSchema = Joi.object({
  couple_id: Joi.number().integer().positive().required(),
  user_id: Joi.number().integer().positive().required(),
  picture_url: Joi.string()
    .pattern(/^.+\.(jpg|jpeg|png|webp)$/)
    .allow(null)
    .required(),
  message: Joi.string().max(500).required(),
  send_at: Joi.string().required(),
  is_read: Joi.number().required(),
});
