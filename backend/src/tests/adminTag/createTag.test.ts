import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { server } from '@src/app';
import Database from '@src/db';
import { issueAccessToken } from '@utils/issueToken';
import 'dotenv/config';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';
import request from 'supertest';

const cleanUp = async (conn: Connection): Promise<void> => {
  const sql = "delete from tag where name = '새로운 태그 생성 테스트'";
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

describe('POST /admin/tag 태그 생성', () => {
  let token;

  beforeEach(() => {
    token = issueAccessToken(parseInt(process.env.ADMIN_ID), process.env.ADMIN_EMAIL);
  });

  it('정상 요청', async () => {
    const response = await request(server).post('/admin/tag').set('Cookie', `access-token=${token}`).send({
      tag: '새로운 태그 생성 테스트',
    });
    expect(response.status).toBe(http.CREATED);

    await databaseConnector(async (conn: Connection) => {
      const sql = "select name from tag where name = '새로운 태그 생성 테스트'";
      const [result] = await conn.execute(sql);
      expect(result[0].name).toEqual('새로운 태그 생성 테스트');
    })();
  });

  it('토큰 없음', async () => {
    const response = await request(server).post('/admin/tag').send({
      tag: '새로운 태그 생성 테스트',
    });
    expect(response.status).toBe(http.UNAUTHORIZED);
  });

  it('관리자 아님', async () => {
    token = issueAccessToken(1, 'constant@gmail.com');
    const response = await request(server).post('/admin/tag').set('Cookie', `access-token=${token}`).send({
      tag: '새로운 태그 생성 테스트',
    });
    expect(response.status).toBe(http.UNAUTHORIZED);
  });

  it('키가 잘못된 요청 양식', async () => {
    const response = await request(server).post('/admin/tag').set('Cookie', `access-token=${token}`).send({
      tags: '새로운 태그 생성 테스트',
    });
    expect(response.status).toBe(http.BAD_REQUEST);
  });

  it('값이 잘못된 요청 양식', async () => {
    const response = await request(server).post('/admin/tag').set('Cookie', `access-token=${token}`).send({
      tag: 123,
    });
    expect(response.status).toBe(http.BAD_REQUEST);
  });

  it('이름이 너무 긴 태그', async () => {
    const response = await request(server).post('/admin/tag').set('Cookie', `access-token=${token}`).send({
      tag: '이름이 너무 긴 태그이름이 너무 긴 태그이름이 너무 긴 태그이름이 너무 긴 태그이름이 너무 긴 태그이름이 너무 긴 태그이름이 너무 긴 태그',
    });
    expect(response.status).toBe(http.BAD_REQUEST);
  });

  it('이미 존재하는 태그', async () => {
    const response = await request(server).post('/admin/tag').set('Cookie', `access-token=${token}`).send({
      tag: '카페',
    });
    expect(response.status).toBe(http.CONFLICT);
  });
});
