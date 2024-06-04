import Joi from 'joi';

export interface partner {
  id: number;
  user_id: number;
}

export interface partnerChatlist {
  couple_id: number;
  user1_id: number;
  user2_id: number;
  email: string;
  picture_url: string | null;
  nickname: string;
  message: string;
  is_read: number;
  commu_streak: number;
}

export const partnerChatlistSchema = Joi.object({
  couple_id: Joi.number().integer().positive().required(),
  user1_id: Joi.number().integer().positive().required(),
  user2_id: Joi.number().integer().positive().required(),
  email: Joi.string().email().max(320).required(),
  picture_url: Joi.string()
    .pattern(/^.+\.(jpg|jpeg|png|webp)$/)
    .allow(null),
  nickname: Joi.string().max(20).required(),
  message: Joi.string().max(500).required(),
  is_read: Joi.number().integer().required(),
  commu_streak: Joi.number().integer().required(),
});

export const UserIDParamsSchema = Joi.string().pattern(/^[1-9]\d*$/);

export const partnerSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});
