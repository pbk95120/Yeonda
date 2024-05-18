import { Diary, DiarySchema, DiaryUpdate, DiaryUpdateSchema } from '@models/diary.model';
import { Preferences } from '@models/preference.model';
import { Tag } from '@models/tag.model';
import { User } from '@models/user.model';
import { Logon, LogonSchema } from '@schemas/login.schema';
import { DistanceSchema, EndAgeSchema, StartAgeSchema } from '@schemas/myProfile.schema';
import { PreferGenderSchema } from '@schemas/signup.schema';
import Joi from 'joi';

export interface PreferencesRequest extends Logon, Preferences {}

export const PreferencesRequestSchema = LogonSchema.concat(
  Joi.object({
    gender: PreferGenderSchema,
    distance: DistanceSchema,
    start_age: StartAgeSchema,
    end_age: EndAgeSchema,
  }),
);

export interface FirstRandomDiaryResponse extends Diary {
  tags: Tag['id'][];
  prefer_id: User['id'][];
}

export const PositiveIntegerSchema = Joi.number().integer().positive().strict().required();
export const PositiveIntegerURLSchema = Joi.string()
  .pattern(/^[1-9]\d*$/)
  .required();
export const PositiveIntegerArraySchema = Joi.array().items(Joi.number().integer().positive().strict()).required();

export const TagsSchema = PositiveIntegerArraySchema.label('Tags');
export const PreferIdSchema = PositiveIntegerArraySchema.label('PreferId');

export const FirstRandomDiaryResponseSchema = DiarySchema.concat(
  Joi.object({
    tags: TagsSchema,
    prefer_id: PreferIdSchema,
  }),
);

export interface PreferIdRequest extends Logon {
  prefer_id: User['id'];
}

export const PreferIdRequestSchema = LogonSchema.concat(
  Joi.object({ prefer_id: Joi.number().integer().positive().strict() }),
);

export interface UsualRandomDiary extends Diary {
  tags: Tag['id'][];
}

export interface PopularDiaries extends UsualRandomDiary {}

export interface CreateDiary extends Logon, DiaryUpdate {}

export const CreateDiarySchema = LogonSchema.concat(DiaryUpdateSchema);
