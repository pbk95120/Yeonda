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

describe('GET /profile/my/tag 선호 태그 가져오기', () => {
  let token;

  beforeEach(async () => {
    token = issueAccessToken(1, 'constant@gmail.com');
  });

  it('정상 요청', async () => {
    const response = await request(server).get('/profile/my/tag').set('Cookie', `access-token=${token}`);
    expect(response.status).toBe(http.OK);
    expect(response.body).toEqual([
      {
        id: 1,
        name: '카페',
      },
      {
        id: 2,
        name: '산책',
      },
      {
        id: 3,
        name: '한강',
      },
    ]);
  });

  it('토큰 없음', async () => {
    const response = await request(server).get('/profile/my/tag');
    expect(response.status).toBe(http.UNAUTHORIZED);
  });
});
