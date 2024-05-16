import { SignupInfoSchema } from '@schemas/signup.schema';
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

describe('GET /signup 회원 가입 페이지 접속', () => {
  it('도, 태그 관련 정보들을 제공해야함', async () => {
    const response = await request(server).get('/signup');
    expect(response.status).toBe(http.OK);
    const { error } = SignupInfoSchema.validate({
      tags: [response.body.tags[0]],
    });
    expect(error).toBeUndefined();
  });
});
