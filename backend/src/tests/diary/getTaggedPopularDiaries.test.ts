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

describe('GET /diary/popular/:tag_id', () => {
  let token;

  beforeEach(() => {
    token = issueAccessToken(1, 'constant@gmail.com');
  });

  it('정상 요청', async () => {
    const response = await request(server).get('/diary/popular/10').set('Cookie', `access-token=${token}`);
    expect(response.status).toBe(http.OK);
    const result = await databaseConnector(async (conn: Connection) => {
      const sql = `
      select d.*, json_arrayagg(json_object('id', t.id, 'name', t.name)) as tags
      from diary d
      left join diary_tag dt on d.id = dt.diary_id
      join tag t on t.id = dt.tag_id
      where d.id in (
        select d2.id
        from diary d2
        join diary_tag dt2 on d2.id = dt2.diary_id
        where d2.created_at >= now() - interval 2 week and dt2.tag_id = 10
      )
      group by d.id
      order by likes desc
      limit 5;
      `;
      const [result] = await conn.execute(sql);
      return result;
    })();
    expect(response.body).toEqual(result);
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
