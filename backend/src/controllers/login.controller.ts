import { checkUser } from '@databases/checkUser.database';
import { databaseConnector } from '@middlewares/databaseConnector';
import { ERR } from '@middlewares/errorHandler';
import { isError } from '@middlewares/isError';
import { Controller } from '@schemas/controller.schema';
import { LoginSchema } from '@schemas/login.schema';
import { issueToken } from '@utils/issueToken';
import http from 'http-status-codes';

export const proceedLogin: Controller = async (req, res, next) => {
  const { error } = LoginSchema.validate(req.body);
  if (isError(next, error, ERR.BadRequest)) return;

  const { email, password } = req.body;
  const isSame = await databaseConnector(checkUser)(email, password);
  if (isError(next, isSame)) return;

  const token = issueToken(email);
  res.cookie('access-token', token, {
    sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'none',
    secure: process.env.NODE_ENV !== 'development',
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
  });
  res.sendStatus(http.NO_CONTENT);
};
