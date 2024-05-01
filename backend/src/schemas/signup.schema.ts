import { TagName } from '@models/tag.model';
import Joi from 'joi';

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
