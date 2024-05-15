import { selectUserforLogin } from '@databases/selectUserforLogin.database';
import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { Controller } from '@schemas/controller.schema';
import { Login, LoginSchema } from '@schemas/login.schema';
import CustomError from '@src/error';
import { issueAccessToken, issueRefreshToken } from '@utils/issueToken';
import http from 'http-status-codes';

export const proceedLogin: Controller = async (req, res) => {
  const { error } = LoginSchema.validate(req.body);
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 로그인 양식', error);

  const { email, password }: Login = req.body;
  const user_id = await databaseConnector(selectUserforLogin)(email, password);
  const accessToken = issueAccessToken(user_id, email);
  const refreshToken = issueRefreshToken(user_id, email);

  res.cookie('access-token', accessToken, {
    sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'strict',
    secure: process.env.NODE_ENV !== 'development',
    httpOnly: true,
    maxAge: 1000 * 60 * 10,
  });

  res.cookie('refresh-token', refreshToken, {
    sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'strict',
    secure: process.env.NODE_ENV !== 'development',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  res.sendStatus(http.OK);
};
