import { RandomDiarySchema } from '@schemas/diary.schema';
import { server } from '@src/app';
import Database from '@src/db';
import { issueAccessToken } from '@utils/issueToken';
import http from 'http-status-codes';
import request from 'supertest';

beforeAll(async () => {
  Database.switchToTest();
});

afterAll(async () => {
  Database.closePool();
});

describe('GET /diary/post-random 선호도 기반 랜덤 일기 없을 시의 완전 랜덤 일기', () => {
  let token;

  beforeEach(() => {
    token = issueAccessToken(1, 'constant@gmail.com');
  });

  it('정상 요청', async () => {
    const response = await request(server).get('/diary/post-random').set('Cookie', `access-token=${token}`);
    expect(response.status).toBe(http.OK);

    const { error } = RandomDiarySchema.validate(response.body);
    expect(error).toBeUndefined();
  });

  it('토큰 없음', async () => {
    const response = await request(server).get('/diary/post-random');
    expect(response.status).toBe(http.UNAUTHORIZED);
  });
});
