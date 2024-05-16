import 'dotenv/config';
import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

export const issueToken = (email: string): string => {
  return jwt.sign({ email: email }, JWT_SECRET as string, { expiresIn: '10m' });
};
