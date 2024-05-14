import { Address } from '@models/address.model';
import { Preference } from '@models/preference.model';
import { Tag, TagName } from '@models/tag.model';
import { User } from '@models/user.model';
import { PasswordConfirm } from '@schemas/passwordReset.schema';
import Joi from 'joi';

export interface RawSignup
  extends Pick<User, 'nickname' | 'email' | 'birth'>,
    PasswordConfirm,
    Pick<Preference, 'distance' | 'start_age' | 'end_age'> {
  gender: User['gender'];
  picture: string;
  address: Address['detail'];
  prefer_gender: Preference['gender'];
  tags: string;
}

export interface RawSignupPicUrl extends RawSignup {
  picture_url: string;
}

export const EmailSchema = Joi.string().email().max(320).required();

export const PasswordSchema = Joi.string()
  .min(5)
  .max(20)
  .pattern(/^[A-Za-z0-9]+$/)
  .required();

export const PictureUrlSchema = Joi.string()
  .pattern(/^.+\.(jpg|jpeg|png|webp)$/)
  .allow(null);

export const AddressDetailSchema = Joi.string().max(100).required();

export const PreferGenderSchema = Joi.string().valid('Male', 'Female', 'Neutral').required();

export const SignDistanceSchema = Joi.string().pattern(/^\d{1,4}$/);

export const SignStartAgeSchema = Joi.string().pattern(/^\d{2}$/);

export const SignEndAgeSchema = Joi.string().pattern(/^\d{2}$/);

export const TagsSchema = Joi.string()
  .pattern(/^\d+(,\d+)*$/)
  .required();

export const RawSignupSchema = Joi.object({
  nickname: Joi.string().max(20).required(),
  email: EmailSchema,
  password: PasswordSchema,
  password_check: Joi.string().valid(Joi.ref('password')).required(),
  gender: Joi.string().valid('Male', 'Female').required(),
  picture_url: PictureUrlSchema,
  birth: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required(),
  address: AddressDetailSchema,
  prefer_gender: PreferGenderSchema,
  distance: SignDistanceSchema,
  start_age: SignStartAgeSchema,
  end_age: SignEndAgeSchema,
  tags: TagsSchema,
});

export interface Signup {
  user: Pick<User, 'email' | 'nickname' | 'gender' | 'birth' | 'picture_url'> & PasswordConfirm;
  address: Address['detail'];
  preference: Pick<Preference, 'gender' | 'distance' | 'start_age' | 'end_age'>;
  user_tag: {
    tags: Tag['id'][];
  };
}

export interface SignupInfo {
  tags: TagName[];
}

export const SignupInfoSchema = Joi.object({
  tags: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().strict().required(),
        name: Joi.string().required(),
      }),
    )
    .required(),
});
