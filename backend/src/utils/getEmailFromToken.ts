import CustomError from '@src/error';
import 'dotenv/config';
import http from 'http-status-codes';
import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

export const getEmailFromToken = async (token: string): Promise<string> => {
  try {
    const decoded = (await jwt.verify(token, JWT_SECRET as string)) as {
      email: string;
    };
    return decoded.email;
  } catch (error) {
    throw new CustomError(http.UNAUTHORIZED, '토큰에서 이메일을 추출할 수 없음', error);
  }
};
