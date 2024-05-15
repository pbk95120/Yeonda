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

describe('GET /diary/my/:id 내 일기 상세', () => {
  it('정상 요청', async () => {
    const token = issueToken(1, 'user1@example.com');
    const response = await request(server).get('/diary/my/1').set('Cookie', `access-token=${token}`);
    console.log(response.body);
    expect(response.status).toBe(http.OK);
    expect(response.body).toEqual([
      {
        id: 1,
        nickname: 'User1',
        picture_url: 'url1',
        title: 'Title 1',
        content: 'Content 1',
        tags: [1, 2],
        created_at: '2024-04-25 10:28:03',
        likes: 10,
      },
    ]);
  });

  it('토큰 없음', async () => {
    const response = await request(server).get('/diary/my/1');
    expect(response.status).toBe(http.UNAUTHORIZED);
  });
});
