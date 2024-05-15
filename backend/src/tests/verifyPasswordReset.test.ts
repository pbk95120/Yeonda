import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { server } from '@src/app';
import Database from '@src/db';
import { getLogonFromToken } from '@utils/getLogonFromToken';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';
import request from 'supertest';

beforeAll(async () => {
  Database.switchToTest();
});

afterAll(async () => {
  Database.closePool();
});

describe('POST /password/reset/verify 비밀번호 초기화 코드 인증', () => {
  let code;

  beforeEach(async () => {
    code = await databaseConnector(async (conn: Connection) => {
      let sql = 'select code from password_reset where id = 1';
      const [result] = await conn.execute(sql);
      return result[0].code;
    })();
  });

  it('정상 요청', async () => {
    const response = await request(server).post('/password/reset/verify').send({
      email: 'constant@gmail.com',
      code: code,
    });

    const cookie = response.headers['set-cookie'][0];
    expect(cookie).toBeDefined();

    const regex = /access-token=([^;]+)/;
    const match = cookie.match(regex);

    if (match && match[1]) {
      const token = match[1];
      const decoded = await getLogonFromToken(token, false);
      expect(decoded.user_id).toEqual(1);
      expect(decoded.email).toEqual('constant@gmail.com');
      expect(response.status).toBe(http.OK);
    } else throw new Error();
  });

  it('형식이 잘못된 인증 코드', async () => {
    const response = await request(server).post('/password/reset/verify').send({
      email: 'constant@gmail.com',
      code: code.toLowerCase(),
    });
    expect(response.status).toBe(http.BAD_REQUEST);
  });

  it('잘못된 이메일', async () => {
    const response = await request(server).post('/password/reset/verify').send({
      email: 'faker@gmail.com',
      code: code,
    });
    expect(response.status).toBe(http.NOT_FOUND);
  });

  it('올바르지 않은 이메일 또는 비밀번호 인증 코드', async () => {
    const response = await request(server).post('/password/reset/verify').send({
      email: 'constant@gmail.com',
      code: 'FACODE',
    });
    expect(response.status).toBe(http.UNAUTHORIZED);
  });
});
