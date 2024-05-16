import { selectUserforLogin } from '@databases/login/selectUserforLogin.database';
import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { Controller } from '@schemas/controller.schema';
import { Login, LoginSchema } from '@schemas/login.schema';
import CustomError from '@src/error';
import { getLogonFromExpiredAccessToken } from '@utils/getLogonFromExpiredAccessToken';
import { getLogonFromToken } from '@utils/getLogonFromToken';
import { issueAccessToken, issueRefreshToken } from '@utils/issueToken';
import { setLoginCookie } from '@utils/setLoginCookie';
import http from 'http-status-codes';

export const proceedLogin: Controller = async (req, res) => {
  const { error } = LoginSchema.validate(req.body);
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 로그인 양식', error);

  const { email, password }: Login = req.body;
  const user_id = await databaseConnector(selectUserforLogin)(email, password);
  const accessToken = issueAccessToken(user_id, email);
  const refreshToken = issueRefreshToken(user_id, email);

  setLoginCookie(res, accessToken, refreshToken);

  res.sendStatus(http.OK);
};

export const refreshUser: Controller = async (req, res) => {
  const accessToken = req.cookies['access-token'];
  if (!accessToken) throw new CustomError(http.UNAUTHORIZED, '만료된 엑세스 토큰 없음');
  const decoded = getLogonFromExpiredAccessToken(accessToken);

  const refreshToken = req.cookies['refresh-token'];
  if (!refreshToken) throw new CustomError(http.UNAUTHORIZED, '유효한 리프레시 토큰 없음');
  const refresh = getLogonFromToken(refreshToken, true);

  if (decoded.user_id === refresh.user_id && decoded.email === refresh.email) {
    const newAccessToken = issueAccessToken(refresh.user_id, refresh.email);
    const newRefreshToken = issueRefreshToken(refresh.user_id, refresh.email);

    setLoginCookie(res, newAccessToken, newRefreshToken);

    res.sendStatus(http.OK);
  } else {
    res.sendStatus(http.UNAUTHORIZED);
  }
};
