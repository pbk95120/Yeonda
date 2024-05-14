import { server } from '@src/app';
import Database from '@src/db';
import { issueToken } from '@utils/issueToken';
import http from 'http-status-codes';
import request from 'supertest';

beforeAll(async () => {
  Database.switchToTest();
});

afterAll(async () => {
  Database.closePool();
});

describe('GET /diary/pre-random 첫 랜덤 일기 가져오기', () => {
  let token;

  beforeEach(() => {
    token = issueToken(1, 'constant@gmail.com');
  });

  it('정상 요청', async () => {
    const response = await request(server).get('/diary/pre-random').set('Cookie', `access-token=${token}`).send({
      gender: 'Female',
      distance: 100,
      start_age: 20,
      end_age: 30,
    });
    expect(response.status).toBe(http.OK);
  });

  it('토큰 없음', async () => {
    const response = await request(server).get('/diary/pre-random').send({
      gender: 'Female',
      distance: 100,
      start_age: 20,
      end_age: 30,
    });
    expect(response.status).toBe(http.UNAUTHORIZED);
  });

  it('잘못된 선호도 양식', async () => {
    const response = await request(server).get('/diary/pre-random').set('Cookie', `access-token=${token}`).send({
      gender: 'Female',
      distance: '100',
      start_age: 20,
      end_age: 30,
    });
    expect(response.status).toBe(http.BAD_REQUEST);
  });

  it('조건에 맞는 일기 없음', async () => {
    const response = await request(server).get('/diary/pre-random').set('Cookie', `access-token=${token}`).send({
      gender: 'Female',
      distance: 100,
      start_age: 40,
      end_age: 50,
    });
    expect(response.status).toBe(http.NOT_FOUND);
  });
});
