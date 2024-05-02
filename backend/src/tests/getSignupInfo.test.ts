import { SignupInfoSchema } from '@schemas/signup.schema';
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

describe('GET /signup', () => {
  it('도, 태그 관련 정보들을 제공해야함', async () => {
    const response = await request(app).get('/signup');
    expect(response.status).toBe(http.OK);
    const { error } = SignupInfoSchema.validate({
      tags: [response.body.tags[0]],
    });
    expect(error).toBeUndefined();
  });
});
