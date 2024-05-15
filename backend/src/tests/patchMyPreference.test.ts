import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { server } from '@src/app';
import Database from '@src/db';
import { issueToken } from '@utils/issueToken';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';
import request from 'supertest';

const cleanUp = async (conn: Connection): Promise<void> => {
  let sql = "update preference set gender = 'Female', distance = 100, start_age = 20, end_age = 30";
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

describe('PATCH /profile/my/preference 회원 선호도 설정 수정', () => {
  let token;
  let form;

  beforeEach(() => {
    token = issueToken(1, 'constant@gmail.com');
    form = {
      gender: 'Neutral',
      distance: '200',
      start_age: '10',
      end_age: '20',
    };
  });

  it('정상 요청', async () => {
    const response = await request(server)
      .patch('/profile/my/preference')
      .set('Cookie', `access-token=${token}`)
      .send(form);
    expect(response.status).toBe(http.OK);

    await databaseConnector(async (conn: Connection) => {
      let sql = "select id from user where email = 'constant@gmail.com'";
      let [result] = await conn.execute(sql);
      const user_id = result[0].id;

      sql = 'select gender, distance, start_age, end_age from preference where user_id = :user_id';
      let values = { user_id: user_id };
      [result] = await conn.execute(sql);
      expect(result[0]).toEqual(form);
    });
  });

  it('토큰 없음', async () => {
    const response = await request(server).patch('/profile/my/preference').send(form);
    expect(response.status).toBe(http.UNAUTHORIZED);
  });

  it('양식 없음', async () => {
    const response = await request(server).patch('/profile/my/preference').set('Cookie', `access-token=${token}`);
    expect(response.status).toBe(http.BAD_REQUEST);
  });

  it('잘못된 양식', async () => {
    form.gender = 'MaleFeMale';
    const response = await request(server)
      .patch('/profile/my/preference')
      .set('Cookie', `access-token=${token}`)
      .send(form);
    expect(response.status).toBe(http.BAD_REQUEST);
  });
});
