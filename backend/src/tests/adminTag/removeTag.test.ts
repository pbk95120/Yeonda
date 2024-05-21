import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { server } from '@src/app';
import Database from '@src/db';
import { issueAccessToken } from '@src/utils/issueToken';
import 'dotenv/config';
import http from 'http-status-codes';
import { Connection, ResultSetHeader } from 'mysql2/promise';
import request from 'supertest';

let id: number;

const setUp = async (conn: Connection): Promise<number> => {
  const sql = "insert into tag (name, vector) values ('삭제용 태그', '삭제용 벡터')";
  const [result] = await conn.execute<ResultSetHeader>(sql);
  return result.insertId;
};

const cleanUp = async (conn: Connection): Promise<void> => {
  const sql = "delete from tag where name = '삭제용 태그'";
  await conn.execute(sql);
  return;
};

beforeAll(async () => {
  Database.switchToTest();
  try {
    id = await databaseConnector(setUp)();
  } catch (error) {
    console.error('셋업 도중 에러 발생', error);
  }
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

describe('DELETE /admin/tag/:id 태그 삭제', () => {
  let token;

  beforeEach(() => {
    token = issueAccessToken(parseInt(process.env.ADMIN_ID), process.env.ADMIN_EMAIL);
  });

  it('정상 요청', async () => {
    const response = await request(server).delete(`/admin/tag/${id}`).set('Cookie', `access-token=${token}`);
    expect(response.status).toBe(http.OK);

    await databaseConnector(async (conn: Connection) => {
      const sql = "select * from tag where name = '삭제용 태그'";
      const [result] = await conn.execute(sql);
      expect(result[0]).toBeUndefined();
    })();
  });

  it('토큰 없음', async () => {
    const response = await request(server).delete(`/admin/tag/${id}`);
    expect(response.status).toBe(http.UNAUTHORIZED);
  });

  it('관리자 아님', async () => {
    token = issueAccessToken(1, 'constant@gmail.com');
    const response = await request(server).delete(`/admin/tag/${id}`).set('Cookie', `access-token=${token}`);
    expect(response.status).toBe(http.UNAUTHORIZED);
  });

  it('잘못된 태그 ID 양식', async () => {
    const response = await request(server).delete(`/admin/tag/name`).set('Cookie', `access-token=${token}`);
    expect(response.status).toBe(http.BAD_REQUEST);
  });

  it('존재하지 않는 태그 ID', async () => {
    const response = await request(server).delete(`/admin/tag/9999`).set('Cookie', `access-token=${token}`);
    expect(response.status).toBe(http.NOT_FOUND);
  });
});
