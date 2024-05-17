import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { server } from '@src/app';
import Database from '@src/db';
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

describe('POST /openai/embedding/tag 태그 생성', () => {
  it('정상 요청', async () => {
    const response = await request(server).post('/openai/embedding/tag').send({
      tag: '새로운 태그 생성 테스트',
    });
    expect(response.status).toBe(http.CREATED);

    await databaseConnector(async (conn: Connection) => {
      const sql = "select name from tag where name = '새로운 태그 생성 테스트'";
      const [result] = await conn.execute(sql);
      expect(result[0].name).toEqual('새로운 태그 생성 테스트');
    })();
  });

  it('키가 잘못된 요청 양식', async () => {
    const response = await request(server).post('/openai/embedding/tag').send({
      tags: '새로운 태그 생성 테스트',
    });
    expect(response.status).toBe(http.BAD_REQUEST);
  });

  it('값이 잘못된 요청 양식', async () => {
    const response = await request(server).post('/openai/embedding/tag').send({
      tag: 123,
    });
    expect(response.status).toBe(http.BAD_REQUEST);
  });

  it('이미 존재하는 태그', async () => {
    const response = await request(server).post('/openai/embedding/tag').send({
      tag: '카페',
    });
    expect(response.status).toBe(http.CONFLICT);
  });
});
