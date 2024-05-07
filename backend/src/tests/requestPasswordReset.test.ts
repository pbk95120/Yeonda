import { databaseConnector } from '@middlewares/databaseConnector';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';
import request from 'supertest';
import app from '../app';
import Database from '../db';

const cleanUp = async (conn: Connection) => {
  let sql = 'delete from password_reset where id != 1';
  await conn.execute(sql);
  return;
};

beforeAll(async () => {
  Database.switchToTest();
});

afterAll(async () => {
  try {
    await databaseConnector(cleanUp)();
  } catch (error) {
    console.log(error);
  } finally {
    Database.closePool();
  }
});

describe('POST /password/reset 비밀번호 리셋 요청', () => {
  // it('정상 요청', async () => {
  //   const response = await request(app).post('/password/reset').send({
  //     email: 'leehoosgg@gmail.com',
  //   });
  //   expect(response.status).toBe(http.OK);
  // });

  it('잘못된 이메일', async () => {
    const response = await request(app).post('/password/reset').send({
      email: 'leehoosgg@gmail',
    });
    expect(response.status).toBe(http.BAD_REQUEST);
  });

  // it('존재하지 않는 이메일', async () => {
  //   const response = await request(app).post('/password/reset').send({
  //     email: 'faker@gmail.com',
  //   });
  //   expect(response.status).toBe(http.NOT_FOUND);
  // });

  // it('이미 유효한 인증 코드가 발급된 이메일', async () => {
  //   const response = await request(app).post('/password/reset').send({
  //     email: 'constant@gmail.com',
  //   });
  //   expect(response.status).toBe(http.CONFLICT);
  // });
});
