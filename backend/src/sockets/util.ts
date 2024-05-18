import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import 'dotenv/config';

const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;

export const getUserInfoFromCookie = (headerCookie) => {
  try {
    const cookies = cookie.parse(headerCookie);
    const decoded = getLogonFromToken(cookies['access-token'], false);
    return [decoded.user_id, decoded.email];
  } catch (error) {
    throw new Error('인증 실패: 쿠키 값이 유효하지 않습니다.');
  }
};

export const getLogonFromToken = (token: string, isRefresh: boolean) => {
  try {
    let decoded;
    if (isRefresh) decoded = jwt.verify(token, JWT_REFRESH_SECRET);
    else decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('인증 실패: jwt토큰 값이 유효하지 않습니다.');
  }
};
