import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { server } from '@src/app';
import Database from '@src/db';
import { getEncryptPassword } from '@utils/getEncryptPassword';
import { getLogonFromToken } from '@utils/getLogonFromToken';
import { issueAccessToken } from '@utils/issueToken';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';
import request from 'supertest';

const cleanUp = async (conn: Connection): Promise<void> => {
  const encryptPassword = await getEncryptPassword('constant');
  let sql = 'update user set password = :password where email = :email';
  let values = { email: 'leehoosgg@gmail.com', password: encryptPassword };
  await conn.execute(sql, values);
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

describe('POST /password/reset/confirm 비밀번호 변경 요청', () => {
  let form;

  beforeEach(() => {
    form = {
      email: 'leehoosgg@gmail.com',
      password: 'change',
      password_check: 'change',
    };
  });

  it('정상 요청', async () => {
    const token = issueAccessToken(2, form.email);
    let response = await request(server).post('/password/reset/confirm').set('Cookie', `access-token=${token}`).send({
      password: form.password,
      password_check: form.password_check,
    });
    expect(response.status).toBe(http.OK);

    response = await request(server).post('/login').send({
      email: form.email,
      password: form.password,
    });
    const cookie = response.headers['set-cookie'][0];
    expect(cookie).toBeDefined();

    const regex = /access-token=([^;]+)/;
    const match = cookie.match(regex);

    if (match && match[1]) {
      const token = match[1];
      const email = await getLogonFromToken(token, false);
      expect(email).toEqual(email);
      expect(response.status).toBe(http.OK);
    } else throw new Error();
  });

  it('잘못된 양식', async () => {
    form.password_check = 'notchanged';
    const token = issueAccessToken(2, form.email);
    const response = await request(server).post('/password/reset/confirm').set('Cookie', `access-token=${token}`).send({
      password: form.password,
      password_check: form.password_check,
    });
    expect(response.status).toBe(http.BAD_REQUEST);
  });

  it('토큰 없음', async () => {
    const response = await request(server).post('/password/reset/confirm').send({
      password: form.password,
      password_check: form.password_check,
    });
    expect(response.status).toBe(http.UNAUTHORIZED);
  });
});
