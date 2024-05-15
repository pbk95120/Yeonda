import { Logon } from '@schemas/login.schema';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
const { JWT_SECRET } = process.env;

export const decodeLogonFromToken = (token: string): Logon => {
  return jwt.decode(token) as Logon;
};
