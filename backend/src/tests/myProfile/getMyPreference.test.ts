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

describe('GET /profile/my/preference 취향 정보 가져오기', () => {
  let token;

  beforeEach(() => {
    token = issueAccessToken(1, 'constant@gmail.com');
  });

  it('정상 요청', async () => {
    const response = await request(server).get('/profile/my/preference').set('Cookie', `access-token=${token}`);
    expect(response.status).toBe(http.OK);
    expect(response.body).toEqual({
      gender: 'Female',
      distance: 100,
      start_age: 20,
      end_age: 30,
    });
  });

  it('토큰 없음', async () => {
    const response = await request(server).get('/profile/my/preference');
    expect(response.status).toBe(http.UNAUTHORIZED);
  });
});
