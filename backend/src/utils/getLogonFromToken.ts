import { Logon } from '@schemas/login.schema';
import CustomError from '@src/error';
import 'dotenv/config';
import http from 'http-status-codes';
import jwt from 'jsonwebtoken';

const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;

export const getLogonFromToken = (token: string, isRefresh: boolean): Logon => {
  try {
    let decoded;
    if (isRefresh) decoded = jwt.verify(token, JWT_REFRESH_SECRET) as Logon;
    else decoded = jwt.verify(token, JWT_SECRET) as Logon;
    return decoded;
  } catch (error) {
    throw new CustomError(http.UNAUTHORIZED, '토큰에서 이메일을 추출할 수 없음', error);
  }
};
