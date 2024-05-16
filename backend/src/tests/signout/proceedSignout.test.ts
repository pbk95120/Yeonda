import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { server } from '@src/app';
import Database from '@src/db';
import { issueAccessToken } from '@utils/issueToken';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';
import request from 'supertest';

const cleanUp = async (conn: Connection): Promise<void> => {
  let sql = `insert into user (email, password, nickname, gender, birth, address_id)
  values('signout@gmail.com', '$2b$10$wyxX/tkJViKC.g4LAfz1p.ayFpUycUNexOvniF6eqIKgBfOZqUth6',
  'signout', 'Male', '2000-01-01', 1)`;
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

describe('POST /signout 회원 탈퇴', () => {
  let id;
  let token;

  beforeEach(async () => {
    id = await databaseConnector(async (conn: Connection) => {
      const sql = "select id from user where email = 'signout@gmail.com'";
      const [result] = await conn.execute(sql);
      return result[0]?.id;
    })();
    token = issueAccessToken(id, 'signout@gmail.com');
  });

  it('비밀번호 틀림', async () => {
    const response = await request(server).post('/signout').set('Cookie', `access-token=${token}`).send({
      password: 'signin',
    });
    expect(response.status).toBe(http.UNAUTHORIZED);
  });

  it('정상 요청', async () => {
    const response = await request(server).post('/signout').set('Cookie', `access-token=${token}`).send({
      password: 'signout',
    });
    expect(response.status).toBe(http.OK);

    const isDeleted = await databaseConnector(async (conn: Connection) => {
      const sql = `select id from user where id = ${id}`;
      const [result] = await conn.execute(sql);
      if (!result[0]) return true;
      else return false;
    })();
    expect(isDeleted).toBeTruthy();
  });

  it('토큰 없음', async () => {
    const response = await request(server).post('/signout').send({
      password: 'signout',
    });
    expect(response.status).toBe(http.UNAUTHORIZED);
  });

  it('비밀번호 양식 잘못됨', async () => {
    const response = await request(server).post('/signout').set('Cookie', `access-token=${token}`).send({
      password: 'signout!@',
    });
    expect(response.status).toBe(http.BAD_REQUEST);
  });

  it('비밀번호 필드가 없음', async () => {
    const response = await request(server).post('/signout').set('Cookie', `access-token=${token}`).send({});
    expect(response.status).toBe(http.BAD_REQUEST);
  });
});
