import { Address } from '@models/address.model';
import { Preference, Preferences } from '@models/preference.model';
import { Tag } from '@models/tag.model';
import { User } from '@models/user.model';
import {
  EmailSchema,
  PreferGenderSchema,
  SignDistanceSchema,
  SignEndAgeSchema,
  SignStartAgeSchema,
} from '@schemas/signup.schema';
import { UserIDSchema } from '@schemas/yourProfile.schema';
import Joi from 'joi';

interface IMyProfile
  extends Pick<User, 'email' | 'nickname' | 'gender' | 'birth' | 'picture_url'>,
    Pick<Address, 'latitude' | 'longitude' | 'detail'> {
  tags: Tag['id'][];
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
  tags: number[];

  constructor(userAddress: User & Address, tags: Tag['id'][]) {
    Object.assign(this, userAddress);
    this.tags = tags;
  }
}

export interface PatchMyPreference extends Pick<User, 'email'>, Pick<Preference, 'gender'> {
  user_id: User['id'];
  distance: string;
  start_age: string;
  end_age: string;
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

export const DistanceSchema = Joi.number().min(0).max(9999).strict();

export const StartAgeSchema = Joi.number().min(10).max(99).strict();

export const EndAgeSchema = Joi.number().min(10).max(99).strict();

export const PatchMyPreferenceSchema = Joi.object({
  user_id: UserIDSchema,
  email: EmailSchema,
  gender: PreferGenderSchema,
  distance: SignDistanceSchema,
  start_age: SignStartAgeSchema,
  end_age: SignEndAgeSchema,
});
