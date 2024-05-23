import { DiaryUpdate, DiaryUpdateSchema } from '@models/diary.model';
import { Tag } from '@models/tag.model';
import { PositiveIntegerArraySchema } from '@schemas/diary.schema';
import { Logon, LogonSchema } from '@schemas/login.schema';
import Joi from 'joi';

export interface myDiaryResults {
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
  sort: Joi.string()
    .pattern(/^[1-9]\d*$/)
    .required(),
});

export const diaryIdSchemas = Joi.number().integer().positive().required();

export const diarySchema = Joi.object({
  id: Joi.number().required(),
  nickname: Joi.string().required(),
  picture_url: Joi.string().allow(null).required(),
  title: Joi.string().min(1).max(100).required(),
  content: Joi.string().min(1).max(3000).required(),
  created_at: Joi.date().required(),
  likes: Joi.number().integer().required(),
  tags: Joi.array().items(
    Joi.object({
      id: Joi.number().integer().positive().strict().allow(null).required(),
      name: Joi.string().max(50).allow(null).required(),
    }),
  ),
});

export const diaryListSchema = Joi.array().items(diarySchema);

export interface UpdateDiary extends Logon, DiaryUpdate {
  tags: Tag['id'][];
}

export const UpdateDiarySchemas = LogonSchema.concat(DiaryUpdateSchema).concat(
  Joi.object({
    tags: PositiveIntegerArraySchema.min(0),
  }),
);
