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

describe('GET /diary/popular/:tag_id', () => {
  let token;

  beforeEach(() => {
    token = issueAccessToken(1, 'constant@gmail.com');
  });

  it('정상 요청', async () => {
    const response = await request(server).get('/diary/popular/10').set('Cookie', `access-token=${token}`);
    expect(response.status).toBe(http.OK);
    expect(response.body).toEqual([
      {
        id: 22,
        user_id: 31,
        title: '31 의 일기',
        content: '내용 채우기',
        created_at: '2024-05-14 17:26:08',
        updated_at: null,
        likes: 62,
        tags: [1, 10, 79, 121, 150],
      },
      {
        id: 14,
        user_id: 27,
        title: '27 의 일기',
        content: '내용 채우기',
        created_at: '2024-05-14 17:26:08',
        updated_at: null,
        likes: 10,
        tags: [10, 140, 169, 191, 204],
      },
    ]);
  });

  it('토큰 없음', async () => {
    const response = await request(server).get('/diary/popular/10');
    expect(response.status).toBe(http.UNAUTHORIZED);
  });

  it('잘못된 양식의 인기 태그 URL', async () => {
    const response = await request(server).get('/diary/popular/blabla').set('Cookie', `access-token=${token}`);
    expect(response.status).toBe(http.BAD_REQUEST);
  });

  it('유효하지 않은 인기 태그 URL', async () => {
    const response = await request(server).get('/diary/popular/9999').set('Cookie', `access-token=${token}`);
    expect(response.status).toBe(http.NOT_FOUND);
  });

  it('조건에 맞는 인기 일기 없음', async () => {
    const response = await request(server).get('/diary/popular/5').set('Cookie', `access-token=${token}`);
    expect(response.status).toBe(http.NOT_FOUND);
  });
});
