import { server } from '@src/app';
import Database from '@src/db';
import { getLogonFromToken } from '@utils/getLogonFromToken';
import http from 'http-status-codes';
import request from 'supertest';

beforeAll(async () => {
  Database.switchToTest();
});

afterAll(async () => {
  Database.closePool();
});

describe('POST /login 로그인 요청', () => {
  it('정상 요청', async () => {
    const response = await request(server).post('/login').send({
      email: 'constant@gmail.com',
      password: 'constant',
    });
    expect(response.status).toBe(http.OK);

    const cookies = response.headers['set-cookie'];
    expect(cookies).toBeDefined();

    const accessRegex = /access-token=([^;]+)/;
    const refreshRegex = /refresh-token=([^;]+)/;

    const accessToken = cookies.find((cookie) => accessRegex.test(cookie));
    const refreshToken = cookies.find((cookie) => refreshRegex.test(cookie));

    const accessTokenValue = accessToken.match(accessRegex)[1];
    const refreshTokenValue = refreshToken.match(refreshRegex)[1];

    if (accessTokenValue && refreshTokenValue) {
      let decoded = getLogonFromToken(accessTokenValue, false);
      expect(decoded.user_id).toEqual(1);
      expect(decoded.email).toEqual('constant@gmail.com');

      decoded = getLogonFromToken(refreshTokenValue, true);
      expect(decoded.user_id).toEqual(1);
      expect(decoded.email).toEqual('constant@gmail.com');
    } else throw new Error();
  });

  it('잘못된 이메일', async () => {
    const response = await request(server).post('/login').send({
      email: 'constant@gmail',
      password: 'constant',
    });
    expect(response.status).toBe(http.BAD_REQUEST);
  });

  it('존재하지 않는 사용자', async () => {
    const response = await request(server).post('/login').send({
      email: 'faker@gmail.com',
      password: 'constant',
    });
    expect(response.status).toBe(http.NOT_FOUND);
  });

  it('틀린 비밀번호', async () => {
    const response = await request(server).post('/login').send({
      email: 'constant@gmail.com',
      password: 'incorrect',
    });
    expect(response.status).toBe(http.UNAUTHORIZED);
  });
});
