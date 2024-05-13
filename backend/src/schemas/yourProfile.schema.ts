import Joi from 'joi';

export const UserIDSchema = Joi.string().pattern(/^[1-9]\d*$/);
