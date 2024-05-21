import { Diary, DiaryCreate, DiaryCreateSchema, DiarySchema } from '@models/diary.model';
import { Preferences } from '@models/preference.model';
import { Tag, TagNameSchema } from '@models/tag.model';
import { User } from '@models/user.model';
import { Logon, LogonSchema } from '@schemas/login.schema';
import { PatchMyPreferenceSchema } from '@schemas/myProfile.schema';
import Joi from 'joi';

export interface PreferencesRequest extends Logon, Preferences {}

export const PreferencesRequestSchema = LogonSchema.concat(
  PatchMyPreferenceSchema.custom((value, helpers) => {
    if (value.start_age > value.end_age) {
      return helpers.error('최소 나잇값이 최대 나잇값보다 큼');
    }
    return value;
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

export const PreferIdSchema = PositiveIntegerArraySchema.label('PreferId');

export const FirstRandomDiaryResponseSchema = DiarySchema.keys({
  tags: TagNameSchema,
  prefer_id: PreferIdSchema,
});

export interface PreferIdRequest extends Logon {
  prefer_id: User['id'];
}

export const PreferIdRequestSchema = LogonSchema.concat(
  Joi.object({ prefer_id: Joi.number().integer().positive().strict().required() }),
);

export interface UsualRandomDiary extends Diary {
  tags: Tag['id'][];
}

export interface TotalRandomDiary extends UsualRandomDiary {}

export const RandomDiarySchema = DiarySchema.keys({
  tags: TagNameSchema,
});

export interface PopularDiaries extends UsualRandomDiary {}

export interface CreateDiary extends Logon, DiaryCreate {}

export const CreateDiarySchema = LogonSchema.concat(DiaryCreateSchema);
