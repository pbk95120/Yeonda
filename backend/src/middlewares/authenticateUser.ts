import 'dotenv/config';
import { Controller } from '@schemas/controller.schema';
import { getEmailFromToken } from '@utils/getEmailFromToken';
import CustomError from '@src/error';
import http from 'http-status-codes';

const { JWT_SECRET } = process.env;

export const authenticateUser: Controller = async (req, res, next) => {
  const token = req.cookies?.['access-token'];
  if (!token) throw new CustomError(http.UNAUTHORIZED, '토큰 정보와 불일치');
  req.body.email = await getEmailFromToken(token);
  next();
};
