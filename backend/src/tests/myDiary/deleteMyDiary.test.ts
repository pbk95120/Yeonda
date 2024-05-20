import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { server } from '@src/app';
import Database from '@src/db';
import { issueAccessToken } from '@utils/issueToken';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';
import request from 'supertest';

const cleanUp = async (conn: Connection) => {
  const testData = `INSERT INTO diary (user_id, title, content, created_at, updated_at, likes) VALUES (1, 'Title 4', 'Content 4', '2024-04-25 10:28:03', NULL, 1)`;
  await conn.execute(testData);
  return;
};

beforeAll(async () => {
  try {
    await databaseConnector(cleanUp)();
  } catch (error) {
    console.error('클린업 도중 에러 발생', error);
  } finally {
    Database.switchToTest();
  }
});

afterAll(async () => {
  Database.closePool();
});

describe('DELETE /diary/my/:id 내 일기 삭제', () => {
  it('정상 요청', async () => {
    const token = issueAccessToken(1, 'user1@example.com');
    const diary = await databaseConnector(async (conn: Connection) => {
      const sql = `SELECT id FROM diary WHERE user_id = 1 AND title = 'Title 4' AND content = 'Content 4' AND created_at = '2024-04-25 10:28:03' AND updated_at IS NULL AND likes = 1`;
      const [result] = await conn.execute(sql);
      return result;
    })();
    const response = await request(server).delete(`/diary/my/${diary[0].id}`).set('Cookie', `access-token=${token}`);
    expect(response.status).toBe(http.OK);
    const test = await databaseConnector(async (conn: Connection) => {
      const sql = `select * from diary where id = :id`;
      const [result] = await conn.execute(sql, { id: diary[0].id });
      return result;
    })();
    expect(test).toEqual([]);
  });

  it('토큰 없음', async () => {
    const response = await request(server).delete('/diary/my/4');
    expect(response.status).toBe(http.UNAUTHORIZED);
  });
});
