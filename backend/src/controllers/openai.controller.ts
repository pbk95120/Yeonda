import { insertTag } from '@databases/openai/insertTag.database';
import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { AdminSchema } from '@schemas/admin.schema';
import { Controller } from '@schemas/controller.schema';
import { CreateTagSchema } from '@schemas/openai.schema';
import CustomError from '@src/error';
import http from 'http-status-codes';
import OpenAI from 'openai';

const openai = new OpenAI();

export const createTag: Controller = async (req, res) => {
  const { error: notAdmin } = AdminSchema.validate({ user_id: req.body?.user_id, email: req.body?.email });
  if (notAdmin) throw new CustomError(http.UNAUTHORIZED, '관리자만 접근 가능', notAdmin);

  const { error } = CreateTagSchema.validate(req.body);
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 태그 생성 요청 양식', error);

  const tag = req.body.tag;
  await databaseConnector(insertTag)(tag);
  res.sendStatus(http.CREATED);
};
