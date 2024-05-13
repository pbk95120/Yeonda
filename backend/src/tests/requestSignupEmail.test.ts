import { databaseConnector } from '@middlewares/databaseConnector';
import { server } from '@src/app';
import Database from '@src/db';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';
import request from 'supertest';

const cleanUp = async (conn: Connection): Promise<void> => {
  let sql = 'truncate table signup';
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
    console.error('클린업 도중 에러 발생', error);
  } finally {
    Database.closePool();
  }
});

describe('POST /signup/email 회원 가입 이메일 인증 코드 전송', () => {
  it('정상 요청', async () => {
    const response = await request(server).post('/signup/email').send({
      email: 'leehoosgg@gmail.com',
    });
    expect(response.status).toBe(http.OK);

    await databaseConnector(async (conn: Connection) => {
      const sql = "select email from signup where email = 'leehoosgg@gmail.com'";
      const [result] = await conn.execute(sql);
      expect(result[0].email).toEqual('leehoosgg@gmail.com');
    })();
  });

  it('잘못된 이메일 양식', async () => {
    const response = await request(server).post('/signup/email').send({
      email: 'leehoosgg@gmail',
    });
    expect(response.status).toBe(http.BAD_REQUEST);
  });

  it('중복된 요청', async () => {
    const response = await request(server).post('/signup/email').send({
      email: 'leehoosgg@gmail.com',
    });
    expect(response.status).toBe(http.CONFLICT);
  });
});
