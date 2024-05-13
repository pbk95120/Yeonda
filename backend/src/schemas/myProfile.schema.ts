import { Address } from '@models/address.model';
import { Preference } from '@models/preference.model';
import { Tag } from '@models/tag.model';
import { User } from '@models/user.model';
import { DistanceSchema, EmailSchema, EndAgeSchema, PreferGenderSchema, StartAgeSchema } from '@schemas/signup.schema';
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

interface IMyPreference extends Pick<Preference, 'gender' | 'distance' | 'start_age' | 'end_age'> {}

export interface PatchMyPreference {
  email: string;
  gender: 'Male' | 'Female' | 'Neutral';
  distance: string;
  start_age: string;
  end_age: string;
}

export class MyPreference implements IMyPreference {
  gender: 'Male' | 'Female' | 'Neutral';
  distance: number;
  start_age: number;
  end_age: number;

  constructor(preference: Preference) {
    const { gender, distance, start_age, end_age } = preference;
    this.gender = gender;
    this.distance = distance;
    this.start_age = start_age;
    this.end_age = end_age;
  }
}

export interface MySetting extends Pick<User, 'picture_url'>, Pick<Address, 'detail'> {}

export const MyPreferenceSchema = Joi.object({
  email: EmailSchema,
  gender: PreferGenderSchema,
  distance: DistanceSchema,
  start_age: StartAgeSchema,
  end_age: EndAgeSchema,
});
