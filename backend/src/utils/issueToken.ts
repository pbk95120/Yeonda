import 'dotenv/config';
import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

export const issueToken = (user_id: number, email: string): string => {
  return jwt.sign({ user_id: user_id, email: email }, JWT_SECRET as string, { expiresIn: '10m' });
};
