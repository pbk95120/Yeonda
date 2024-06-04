import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { server } from '@src/app';
import Database from '@src/db';
import { issueAccessToken } from '@utils/issueToken';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';
import request from 'supertest';
import 'dotenv/config';

const cleanUp = async (conn: Connection) => {
  let sql;

  sql = `INSERT INTO likes (diary_id, user_id) VALUES (5, :user_id)`;
  await conn.execute(sql, { user_id: parseInt(process.env.TEST_ID) });

  sql = `INSERT INTO couple (user1_id, user2_id) VALUES (:user1_id, :user2_id)`;
  await conn.execute(sql, { user1_id: parseInt(process.env.TEST_ID), user2_id: parseInt(process.env.TEST2_ID) });

  const [rows] = await conn.query('SELECT id FROM couple ORDER BY id DESC LIMIT 1');
  const count = rows[0].id;

  sql = `INSERT INTO chat (couple_id, user_id, picture_url, message, is_read) VALUES (:count, :user_id, 'url4', 'test', 0)`;
  await conn.execute(sql, { count: parseInt(count), user_id: parseInt(process.env.TEST_ID) });

  sql = `INSERT INTO chat (couple_id, user_id, picture_url, message, is_read) VALUES (:count, :user_id, 'url4', 'test', 0)`;
  await conn.execute(sql, { count: parseInt(count), user_id: parseInt(process.env.TEST2_ID) });
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

describe('DELETE /chatlist/:user2_id 채팅 목록', () => {
  it('관계 해제', async () => {
    const token = issueAccessToken(parseInt(process.env.TEST_ID), process.env.TEST_EMAIL);
    const response = await request(server)
      .delete(`/chatlist/${process.env.TEST2_ID}`)
      .set('Cookie', `access-token=${token}`);
    expect(response.status).toBe(http.OK);

    const like_validate = await databaseConnector(async (conn: Connection) => {
      const sql = 'SELECT * FROM likes';
      const [result] = await conn.execute(sql);
      return result;
    })();
    expect(like_validate.length).toEqual(3);
  });

  it('토큰 없음', async () => {
    const response = await request(server).delete(`/chatlist/${process.env.TEST2_ID}`);
    expect(response.status).toBe(http.UNAUTHORIZED);
  });
});
