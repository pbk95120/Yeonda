import { deleteUser } from '@databases/signout/deleteUser.database';
import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { Controller } from '@schemas/controller.schema';
import { PasswordSchema } from '@schemas/signup.schema';
import CustomError from '@src/error';
import http from 'http-status-codes';

export const proceedSignout: Controller = async (req, res) => {
  const { error } = PasswordSchema.validate(req.body?.password);
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 비밀번호 양식', error);

  await databaseConnector(deleteUser)(req.body);
  res.sendStatus(http.OK);
};
