import { server } from '@src/app';
import Database from '@src/db';
import { getEmailFromToken } from '@src/utils/getLogonFromToken';
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
    const cookie = response.headers['set-cookie'][0];
    expect(cookie).toBeDefined();

    const regex = /access-token=([^;]+)/;
    const match = cookie.match(regex);

    if (match && match[1]) {
      const token = match[1];
      const decoded = await getEmailFromToken(token);
      expect(decoded.user_id).toEqual(1);
      expect(decoded.email).toEqual('constant@gmail.com');
      expect(response.status).toBe(http.OK);
    } else fail();
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
