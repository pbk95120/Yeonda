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

    const result = await databaseConnector(async (conn: Connection) => {
      const sql = `
      select d.*, 
      json_arrayagg(
        case
          when t.id is not null
          then json_object('id', t.id, 'name', t.name)
          else null
        end
      ) as tags  
      from diary d
      left join diary_tag dt on d.id = dt.diary_id
      left join tag t on t.id = dt.tag_id
      where d.created_at >= now() - interval 2 week
      group by d.id
      order by likes desc
      limit 5
      `;
      const [result] = await conn.execute(sql);
      return result;
    })();
    expect(response.body).toEqual(result);
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
