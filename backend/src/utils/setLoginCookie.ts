import { Response } from 'express';

export const setLoginCookie = (res: Response, accessToken: string, refreshToken: string) => {
  res.cookie('access-token', accessToken, {
    sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'strict',
    secure: process.env.NODE_ENV !== 'development',
    httpOnly: true,
    maxAge: 1000 * 60 * 10,
  });

  res.cookie('refresh-token', refreshToken, {
    sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'strict',
    secure: process.env.NODE_ENV !== 'development',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
};
