import { TagName } from '@models/tag.model';
import Joi from 'joi';

export interface RawSignup {
  nickname: string;
  email: string;
  password: string;
  password_check: string;
  gender: string;
  picture: string;
  birth: string;
  address: string;
  prefer_gender: string;
  distance: string;
  start_age: string;
  end_age: string;
  tags: string;
}

export interface RawSignupPicUrl extends RawSignup {
  picture_url: string;
}

const PasswordSchema = Joi.string()
  .min(5)
  .max(20)
  .pattern(/^[^\s]+$/)
  .required();

export const RawSignupSchema = Joi.object({
  nickname: Joi.string().max(20).required(),
  email: Joi.string().email().required(),
  password: PasswordSchema,
  password_check: Joi.string().valid(Joi.ref('password')).required(),
  gender: Joi.string().valid('Male', 'Female').required(),
  picture_url: Joi.string().regex(/^.+\.(jpg|jpeg|png|webp)$/),
  birth: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required(),
  address: Joi.string().required(),
  prefer_gender: Joi.string().valid('Male', 'Female', 'Neutral').required(),
  distance: Joi.string().regex(/^\d{1,4}$/),
  start_age: Joi.string().regex(/^\d{2}$/),
  end_age: Joi.string().regex(/^\d{2}$/),
  tags: Joi.string()
    .regex(/^\d+(,\d+)*$/)
    .required(),
});

export interface Signup {
  user: {
    nickname: string;
    email: string;
    password: string;
    password_check: string;
    gender: 'Male' | 'Female';
    picture_url: string;
    birth: string;
  };
  address: string;
  preference: {
    gender: 'Male' | 'Female' | 'Neutral';
    distance: number;
    start_age: number;
    end_age: number;
  };
  user_tag: {
    tags: number[];
  };
}

export interface SignupInfo {
  tags: TagName[];
}

export const SignupInfoSchema = Joi.object({
  tags: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().required(),
        name: Joi.string().required(),
      }),
    )
    .required(),
});
