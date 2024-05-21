import { deleteTag } from '@databases/adminTag/deleteTag.database';
import { insertTag } from '@databases/adminTag/insertTag.database';
import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { AdminSchema } from '@schemas/admin.schema';
import { Controller } from '@schemas/controller.schema';
import { PositiveIntegerURLSchema } from '@schemas/diary.schema';
import { CreateTagSchema } from '@schemas/openai.schema';
import CustomError from '@src/error';
import http from 'http-status-codes';

export const createTag: Controller = async (req, res) => {
  const { error: notAdmin } = AdminSchema.validate({ user_id: req.body?.user_id, email: req.body?.email });
  if (notAdmin) throw new CustomError(http.UNAUTHORIZED, '관리자만 접근 가능', notAdmin);

  const { error } = CreateTagSchema.validate(req.body);
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 태그 생성 요청 양식', error);

  const tag = req.body.tag;
  await databaseConnector(insertTag)(tag);
  res.sendStatus(http.CREATED);
};

export const removeTag: Controller = async (req, res) => {
  const { error: notAdmin } = AdminSchema.validate({ user_id: req.body?.user_id, email: req.body?.email });
  if (notAdmin) throw new CustomError(http.UNAUTHORIZED, '관리자만 접근 가능', notAdmin);

  const { error } = PositiveIntegerURLSchema.validate(req.params?.id);
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 태그 삭제 요청 양식', error);

  await databaseConnector(deleteTag)(parseInt(req.params.id));
  res.sendStatus(http.OK);
};
