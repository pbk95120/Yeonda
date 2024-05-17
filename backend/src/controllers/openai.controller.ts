import { insertTag } from '@databases/openai/insertTag.database';
import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { Controller } from '@schemas/controller.schema';
import { CreateTagSchema } from '@schemas/openai.schema';
import CustomError from '@src/error';
import http from 'http-status-codes';
import OpenAI from 'openai';

const openai = new OpenAI();

export const createTag: Controller = async (req, res) => {
  const { error } = CreateTagSchema.validate(req.body);
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 태그 생성 요청 양식', error);

  const tag = req.body.tag;
  await databaseConnector(insertTag)(tag);
  res.sendStatus(http.CREATED);
};
