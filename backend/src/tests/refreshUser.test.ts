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

  it('정상 요청', async () => {
    const accessToken = jwt.sign({ user_id: id, email: email }, JWT_SECRET as string, { expiresIn: '0s' });
    const refreshToken = issueRefreshToken(id, email);

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
});
