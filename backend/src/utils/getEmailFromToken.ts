import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { ERR } from '../middlewares/errorHandler';

const { JWT_SECRET } = process.env;

export const getEmailFromToken = async (token: string): Promise<string> => {
  try {
    const decoded = (await jwt.verify(token, JWT_SECRET as string)) as {
      email: string;
    };
    return decoded.email;
  } catch (err) {
    throw new Error(ERR.Unauthorized);
  }
};
