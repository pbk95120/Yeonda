import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { server } from '@src/app';
import Database from '@src/db';
import { issueAccessToken } from '@utils/issueToken';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';
import request from 'supertest';

const cleanUp = async (conn: Connection) => {
  const testData = `INSERT INTO diary (id, user_id, title, content, created_at, updated_at, likes) VALUES (4, 1, 'Title 4', 'Content 4', '2024-04-25 10:28:03', NULL, 15)`;
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
    const response = await request(server).delete('/diary/my/4').set('Cookie', `access-token=${token}`);
    console.log(response.body);
    expect(response.status).toBe(http.OK);
    const diary = await databaseConnector(async (conn: Connection) => {
      const sql = 'select title, content from diary where id = 4';
      const [result] = await conn.execute(sql);
      return result;
    })();
    expect(diary).toEqual([]);
  });

  it('토큰 없음', async () => {
    const response = await request(server).delete('/diary/my/4');
    expect(response.status).toBe(http.UNAUTHORIZED);
  });
});
