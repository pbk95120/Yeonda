import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { server } from '@src/app';
import Database from '@src/db';
import { issueAccessToken } from '@utils/issueToken';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';
import request from 'supertest';

beforeAll(async () => {
  Database.switchToTest();
});

afterAll(async () => {
  Database.closePool();
});

describe('GET /diary/popular 2주간 인기 일기 5개 요청', () => {
  let token;

  beforeEach(() => {
    token = issueAccessToken(1, 'constant@gmail.com');
  });

  it('정상 요청', async () => {
    const response = await request(server).get('/diary/popular').set('Cookie', `access-token=${token}`);
    expect(response.status).toBe(http.OK);
    expect(response.body).toEqual([
      {
        id: 29,
        user_id: 45,
        title: '45 의 일기',
        content: '내용 채우기',
        created_at: '2024-05-14 17:26:08',
        updated_at: null,
        likes: 80,
        tags: [47, 74, 88, 101, 177],
      },
      {
        id: 20,
        user_id: 17,
        title: '17 의 일기',
        content: '내용 채우기',
        created_at: '2024-05-14 17:26:08',
        updated_at: null,
        likes: 78,
        tags: [12, 34, 35, 63],
      },
      {
        id: 21,
        user_id: 7,
        title: '7 의 일기',
        content: '내용 채우기',
        created_at: '2024-05-14 17:26:08',
        updated_at: null,
        likes: 74,
        tags: [null],
      },
      {
        id: 19,
        user_id: 35,
        title: '35 의 일기',
        content: '내용 채우기',
        created_at: '2024-05-14 17:26:08',
        updated_at: null,
        likes: 73,
        tags: [12, 83, 183],
      },
      {
        id: 30,
        user_id: 19,
        title: '19 의 일기',
        content: '내용 채우기',
        created_at: '2024-05-14 17:26:08',
        updated_at: null,
        likes: 65,
        tags: [167],
      },
    ]);
  });

  it('토큰 없음', async () => {
    const response = await request(server).get('/diary/popular');
    expect(response.status).toBe(http.UNAUTHORIZED);
  });

  it('결과 없음', async () => {
    const code = await databaseConnector(async (conn: Connection) => {
      const sql = `
      select d.*, json_arrayagg(dt.tag_id) as tags from diary d
      join diary_tag dt on d.id = dt.diary_id
      where d.created_at >= now() - interval 2 week
      group by d.id
      order by likes desc
      limit 0
      `;
      const [result] = await conn.execute(sql);
      if (!result[0]) return http.NOT_FOUND;
    })();
    expect(code).toEqual(http.NOT_FOUND);
  });
});
