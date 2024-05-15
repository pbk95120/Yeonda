import { server } from '@src/app';
import { issueAccessToken, issueRefreshToken } from '@utils/issueToken';
import request from 'supertest';

describe('POST /logout 로그아웃 요청', () => {
  it('access, refresh token 제거', async () => {
    const accessToken = issueAccessToken(1, 'email');
    const refreshToken = issueRefreshToken(1, 'email');
    const res = await request(server)
      .post('/logout')
      .set('Cookie', `access-token=${accessToken}`)
      .set('Cookie', `refresh-token=${refreshToken}`);

    const cookies = res.headers['set-cookie'];
    expect(cookies).toBeDefined();

    const accessRegex = /access-token=([^;]+)/;
    const refreshRegex = /refresh-token=([^;]+)/;

    const isAccessToken = cookies.find((cookie) => accessRegex.test(cookie)) ? true : false;
    const isRefreshToken = cookies.find((cookie) => refreshRegex.test(cookie)) ? true : false;

    expect(isAccessToken).toBeFalsy();
    expect(isRefreshToken).toBeFalsy();
  });
});
