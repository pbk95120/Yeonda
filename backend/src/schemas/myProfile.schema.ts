import { Address } from '@models/address.model';
import { Preference, Preferences } from '@models/preference.model';
import { TagName } from '@models/tag.model';
import { User } from '@models/user.model';
import { EmailSchema, PreferGenderSchema } from '@schemas/signup.schema';
import { UserIDSchema } from '@schemas/yourProfile.schema';
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
  distance: DistanceSchema,
  start_age: StartAgeSchema,
  end_age: EndAgeSchema,
});
