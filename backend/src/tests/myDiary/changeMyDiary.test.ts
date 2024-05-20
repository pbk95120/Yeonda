import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { server } from '@src/app';
import Database from '@src/db';
import { issueAccessToken } from '@utils/issueToken';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';
import request from 'supertest';

const cleanUp = async (conn: Connection) => {
  const resetSql = `update diary set title = :title, content = :content where id = 10`;
  await conn.execute(resetSql, { title: 'Title 1', content: 'Content 1' });
  return;
};

beforeAll(async () => {
  Database.switchToTest();
});

afterAll(async () => {
  try {
    await databaseConnector(cleanUp)();
  } catch (error) {
    console.error('클린업 도중 에러 발생', error);
  } finally {
    Database.closePool();
  }
});

describe('PUT /diary/my/:id 내 일기 수정', () => {
  it('정상 요청', async () => {
    const token = issueAccessToken(1, 'user1@example.com');
    const response = await request(server).put('/diary/my/10').set('Cookie', `access-token=${token}`).send({
      title: '테스트',
      content: '테스트 본문',
    });

    expect(response.status).toBe(http.OK);
    const diary = await databaseConnector(async (conn: Connection) => {
      const sql = 'select title, content from diary where id = 10';
      const [result] = await conn.execute(sql);
      return result;
    })();
    expect(diary).toEqual([
      {
        title: '테스트',
        content: '테스트 본문',
      },
    ]);
  });

  it('토큰 없음', async () => {
    const response = await request(server).get('/diary/my/1');
    expect(response.status).toBe(http.UNAUTHORIZED);
  });
});
