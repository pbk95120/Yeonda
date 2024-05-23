import { Logon } from '@schemas/login.schema';
import CustomError from '@src/error';
import 'dotenv/config';
import http from 'http-status-codes';
import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

export const getLogonFromExpiredAccessToken = (token: string): Logon => {
  try {
    return jwt.verify(token, JWT_SECRET, { ignoreExpiration: true }) as Logon;
  } catch (error) {
    throw new CustomError(http.UNAUTHORIZED, `엑세스 토큰에서 정보를 추출할 수 없음`, error);
  }
};
