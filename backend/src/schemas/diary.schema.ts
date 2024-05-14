import { Diary } from '@models/diary.model';
import { Preferences } from '@models/preference.model';
import { Tag } from '@models/tag.model';
import { User } from '@models/user.model';
import { LogonSchema } from '@schemas/login.schema';
import { DistanceSchema, EndAgeSchema, StartAgeSchema } from '@schemas/myProfile.schema';
import { PreferGenderSchema } from '@schemas/signup.schema';
import Joi from 'joi';

export interface PreferencesRequest extends Pick<User, 'email'>, Preferences {
  user_id: User['id'];
}

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

export const PreferIdRequestSchema = LogonSchema.concat(
  Joi.object({
    prefer_id: Joi.array().items(Joi.number().strict()).required(),
  }),
);
