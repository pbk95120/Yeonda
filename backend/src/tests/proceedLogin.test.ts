import { getEmailFromToken } from '@utils/getEmailFromToken';
import http from 'http-status-codes';
import request from 'supertest';
import app from '../app';
import Database from '../db';

beforeAll(async () => {
  Database.switchToTest();
});

afterAll(async () => {
  Database.closePool();
});

describe('POST /login 로그인 요청', () => {
  it('정상 요청', async () => {
    const response = await request(app).post('/login').send({
      email: 'constant@gmail.com',
      password: 'constant',
    });
    const cookie = response.headers['set-cookie'][0];
    expect(cookie).toBeDefined();

    const regex = /access-token=([^;]+)/;
    const match = cookie.match(regex);
    if (match && match[1]) {
      const token = match[1];
      const email = await getEmailFromToken(token);
      expect(email).toEqual('constant@gmail.com');
    } else fail();
  });

  it('잘못된 이메일', async () => {
    const response = await request(app).post('/login').send({
      email: 'constant@gmail',
      password: 'constant',
    });
    expect(response.status).toBe(http.BAD_REQUEST);
  });

  it('틀린 비밀번호', async () => {
    const response = await request(app).post('/login').send({
      email: 'constant@gmail.com',
      password: 'incorrect',
    });
    expect(response.status).toBe(http.UNAUTHORIZED);
  });
});
