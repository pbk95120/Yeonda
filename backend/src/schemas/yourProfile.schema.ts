import Joi from 'joi';

export const UserIDSchema = Joi.number().integer().positive().strict();

export const UserIDParamsSchema = Joi.string().pattern(/^[1-9]\d*$/);
