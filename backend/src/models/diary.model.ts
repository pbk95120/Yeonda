import JoiDate from '@joi/date';
import JoiBase from 'joi';

const Joi = JoiBase.extend(JoiDate);

export interface Diary {
  id: number;
  user_id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  likes: number;
}

export const DiarySchema = Joi.object({
  id: Joi.number().min(0).strict().required(),
  user_id: Joi.number().min(0).strict().required(),
  title: Joi.string().required(),
  content: Joi.string().required(),
  created_at: Joi.date().format('YYYY-MM-DD HH:mm:ss').required(),
  updated_at: Joi.date().format('YYYY-MM-DD HH:mm:ss').allow(null).optional(),
  likes: Joi.number().min(0).strict().required(),
});
