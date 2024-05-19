import { Address } from '@models/address.model';
import { Preferences } from '@models/preference.model';
import { TagName } from '@models/tag.model';
import { User } from '@models/user.model';
import { Logon, LogonSchema } from '@schemas/login.schema';
import Joi from 'joi';

interface IMyProfile
  extends Pick<User, 'email' | 'nickname' | 'gender' | 'birth' | 'picture_url'>,
    Pick<Address, 'latitude' | 'longitude' | 'detail'> {
  tags: TagName[];
}

export class MyProfile implements IMyProfile {
  email: string;
  nickname: string;
  gender: 'Male' | 'Female';
  birth: string;
  picture_url: string;
  latitude: number;
  longitude: number;
  detail: string;
  tags: TagName[];

  constructor(userAddress: User & Address, tags: TagName[]) {
    Object.assign(this, userAddress);
    this.tags = tags;
  }
}

export class MyPreference implements Preferences {
  gender: 'Male' | 'Female' | 'Neutral';
  distance: number;
  start_age: number;
  end_age: number;

  constructor(preference: Preferences) {
    const { gender, distance, start_age, end_age } = preference;
    this.gender = gender;
    this.distance = distance;
    this.start_age = start_age;
    this.end_age = end_age;
  }
}

export interface MySetting extends Pick<User, 'picture_url'>, Pick<Address, 'detail'> {}

export const PictureUrlSchema = Joi.string()
  .pattern(/^.+\.(jpg|jpeg|png|webp)$/)
  .required();

export const PreferGenderSchema = Joi.string().valid('Male', 'Female', 'Neutral').required();

export const DistanceSchema = Joi.number().min(0).max(9999).strict().required();

export const StartAgeSchema = Joi.number().min(10).max(99).strict().required();

export const EndAgeSchema = Joi.number().min(10).max(99).strict().required();

export interface PatchMyPreference extends Logon {
  gender: 'Male' | 'Female' | 'Neutral';
  distance: number;
  start_age: number;
  end_age: number;
}

export const PatchMyPreferenceSchema = LogonSchema.concat(
  Joi.object({
    gender: PreferGenderSchema,
    distance: DistanceSchema,
    start_age: StartAgeSchema,
    end_age: EndAgeSchema,
  }),
);
