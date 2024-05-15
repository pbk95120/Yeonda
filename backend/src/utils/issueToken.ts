import 'dotenv/config';
import jwt from 'jsonwebtoken';

const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;

export const issueAccessToken = (user_id: number, email: string): string => {
  return jwt.sign({ user_id: user_id, email: email }, JWT_SECRET as string, { expiresIn: '10m' });
};

export const issueRefreshToken = (user_id: number, email: string): string => {
  return jwt.sign({ user_id: user_id, email: email }, JWT_REFRESH_SECRET as string, { expiresIn: '7d' });
};
