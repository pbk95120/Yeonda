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

describe('POST /diary/random 기본 랜덤 일기 가져오기', () => {
  let token;

  beforeEach(() => {
    token = issueAccessToken(1, 'constant@gmail.com');
  });

  it('정상 요청', async () => {
    const response = await request(server).post('/diary/random').set('Cookie', `access-token=${token}`).send({
      prefer_id: 31,
    });
    expect(response.status).toBe(http.OK);
    expect(response.body).toEqual({
      id: 22,
      user_id: 31,
      title: '31 의 일기',
      content: '내용 채우기',
      created_at: '2024-05-14 17:26:08',
      updated_at: null,
      likes: 62,
      tags: [1, 10, 79, 121, 150],
    });
  });

  it('토큰 없음', async () => {
    const response = await request(server).post('/diary/random').send({
      prefer_id: 31,
    });
    expect(response.status).toBe(http.UNAUTHORIZED);
  });

  it('잘못된 랜덤 일기 요청 양식', async () => {
    const response = await request(server).post('/diary/random').set('Cookie', `access-token=${token}`).send({
      prefer_id: '31',
    });
    expect(response.status).toBe(http.BAD_REQUEST);
  });

  it('선호할만한 유저이나 작성 일기 없음', async () => {
    const response = await request(server).post('/diary/random').set('Cookie', `access-token=${token}`).send({
      prefer_id: 53,
    });
    expect(response.status).toBe(http.NOT_FOUND);
  });

  it('선호할만한 유저이나 이미 좋아요 함', async () => {
    const response = await request(server).post('/diary/random').set('Cookie', `access-token=${token}`).send({
      prefer_id: 4,
    });
    expect(response.status).toBe(http.NOT_FOUND);
  });
});
