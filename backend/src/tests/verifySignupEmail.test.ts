import { server } from '@src/app';
import Database from '@src/db';
import http from 'http-status-codes';
import request from 'supertest';

beforeAll(async () => {
  Database.switchToTest();
});

afterAll(async () => {
  Database.closePool();
});

describe('POST /signup/email/verify', () => {
  let form;

  beforeEach(() => {
    form = {
      email: 'constant@gmail.com',
      code: 'CTCODE',
    };
  });
  it('정상 요청', async () => {
    const response = await request(server).post('/signup/email/verify').send(form);
    expect(response.status).toBe(http.OK);
  });

  it('잘못된 이메일 양식', async () => {
    form.email = 'constant@gmail';
    const response = await request(server).post('/signup/email/verify').send(form);
    expect(response.status).toBe(http.BAD_REQUEST);
  });

  it('잘못된 코드 양식', async () => {
    form.code = 'DEC4';
    const response = await request(server).post('/signup/email/verify').send(form);
    expect(response.status).toBe(http.BAD_REQUEST);
  });

  it('존재하지 않는 회원 가입 인증 이메일, 코드', async () => {
    form.email = 'faker@gmail.com';
    const response = await request(server).post('/signup/email/verify').send(form);
    expect(response.status).toBe(http.UNAUTHORIZED);
  });
});
