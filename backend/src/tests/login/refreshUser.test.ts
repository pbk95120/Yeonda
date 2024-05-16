import { server } from '@src/app';
import { getLogonFromToken } from '@utils/getLogonFromToken';
import { issueRefreshToken } from '@utils/issueToken';
import 'dotenv/config';
import http from 'http-status-codes';
import jwt from 'jsonwebtoken';
import request from 'supertest';
const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;

describe('POST /login/refresh 토큰 갱신 요청', () => {
  const id = 1;
  const email = 'email';
  let accessToken;
  let refreshToken;

  beforeEach(() => {
    accessToken = jwt.sign({ user_id: id, email: email }, JWT_SECRET as string, { expiresIn: '0s' });
    refreshToken = issueRefreshToken(id, email);
  });

  it('정상 요청', async () => {
    const response = await request(server)
      .post('/login/refresh')
      .set('Cookie', [`access-token=${accessToken}`, `refresh-token=${refreshToken}`]);
    expect(response.status).toBe(http.OK);

    const cookies = response.headers['set-cookie'];
    expect(cookies).toBeDefined();

    const accessRegex = /access-token=([^;]+)/;
    const refreshRegex = /refresh-token=([^;]+)/;

    const newAccessToken = cookies.find((cookie) => accessRegex.test(cookie));
    const newRefreshToken = cookies.find((cookie) => refreshRegex.test(cookie));

    const accessTokenValue = newAccessToken.match(accessRegex)[1];
    const refreshTokenValue = newRefreshToken.match(refreshRegex)[1];

    if (accessTokenValue && refreshTokenValue) {
      let decoded = getLogonFromToken(accessTokenValue, false);
      expect(decoded.user_id).toEqual(id);
      expect(decoded.email).toEqual(email);

      decoded = getLogonFromToken(refreshTokenValue, true);
      expect(decoded.user_id).toEqual(id);
      expect(decoded.email).toEqual(email);
    } else throw new Error();
  });

  it('액세스 토큰 필드 자체가 없음', async () => {
    accessToken = 'blabla';

    const response = await request(server)
      .post('/login/refresh')
      .set('Cookie', [`refresh-token=${refreshToken}`]);
    expect(response.status).toBe(http.UNAUTHORIZED);
  });

  it('유효하지 않은 엑세스 토큰', async () => {
    accessToken = 'blabla';

    const response = await request(server)
      .post('/login/refresh')
      .set('Cookie', [`access-token=${accessToken}`, `refresh-token=${refreshToken}`]);
    expect(response.status).toBe(http.UNAUTHORIZED);
  });

  it('리프레시 토큰 없음', async () => {
    refreshToken = '';

    const response = await request(server)
      .post('/login/refresh')
      .set('Cookie', [`access-token=${accessToken}`, `refresh-token=${refreshToken}`]);
    expect(response.status).toBe(http.UNAUTHORIZED);
  });

  it('유효하지 않은 리프레시 토큰', async () => {
    refreshToken = jwt.sign({ user_id: id, email: email }, JWT_REFRESH_SECRET as string, { expiresIn: '0s' });

    const response = await request(server)
      .post('/login/refresh')
      .set('Cookie', [`access-token=${accessToken}`, `refresh-token=${refreshToken}`]);
    expect(response.status).toBe(http.UNAUTHORIZED);
  });

  it('토큰의 내용이 일치하지 않음', async () => {
    refreshToken = issueRefreshToken(id + 1, email);

    const response = await request(server)
      .post('/login/refresh')
      .set('Cookie', [`access-token=${accessToken}`, `refresh-token=${refreshToken}`]);
    expect(response.status).toBe(http.UNAUTHORIZED);
  });
});
