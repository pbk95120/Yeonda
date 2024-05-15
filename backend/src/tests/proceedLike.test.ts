import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { server } from '@src/app';
import Database from '@src/db';
import { issueToken } from '@utils/issueToken';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';
import request from 'supertest';

const cleanUp = async (conn: Connection): Promise<void> => {
  let sql = 'update diary set likes = 0 where id = 1';
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

describe('POST /diary/like/:id', () => {
  let token;

  beforeEach(() => {
    token = issueToken(2, 'leehoosgg@gmail.com');
  });

  it('좋아요 활성', async () => {
    const response = await request(server).post('/diary/like/1').set('Cookie', `access-token=${token}`);
    expect(response.status).toBe(http.OK);

    const likes = await databaseConnector(async (conn: Connection) => {
      const sql = 'select likes from diary where id = 1';
      const [result] = await conn.execute(sql);
      return result[0].likes;
    })();
    expect(likes).toEqual(1);
  });

  it('좋아요 비활성', async () => {
    const response = await request(server).post('/diary/like/1').set('Cookie', `access-token=${token}`);
    expect(response.status).toBe(http.OK);

    const likes = await databaseConnector(async (conn: Connection) => {
      const sql = 'select likes from diary where id = 1';
      const [result] = await conn.execute(sql);
      return result[0].likes;
    })();
    expect(likes).toEqual(0);
  });

  it('토큰 없음', async () => {
    const response = await request(server).post('/diary/like/1');
    expect(response.status).toBe(http.UNAUTHORIZED);
  });

  it('비정상 URL', async () => {
    const response = await request(server).post('/diary/like/notusual').set('Cookie', `access-token=${token}`);
    expect(response.status).toBe(http.BAD_REQUEST);
  });

  it('자기 자신의 일기 좋아요 요청 반려', async () => {
    const response = await request(server).post('/diary/like/2').set('Cookie', `access-token=${token}`);
    expect(response.status).toBe(http.FORBIDDEN);
  });

  it('존재하지 않는 일기 좋아요 요청 반려', async () => {
    const response = await request(server).post('/diary/like/9999').set('Cookie', `access-token=${token}`);
    expect(response.status).toBe(http.NOT_FOUND);
  });
});
