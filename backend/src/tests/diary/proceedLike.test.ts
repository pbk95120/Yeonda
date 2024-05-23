import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { server } from '@src/app';
import Database from '@src/db';
import { issueAccessToken } from '@utils/issueToken';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';
import request from 'supertest';

const cleanUp = async (conn: Connection): Promise<void> => {
  let sql = 'delete from likes where user_id = 2';
  await conn.execute(sql);

  sql = 'delete from couple where user1_id = 2';
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
    token = issueAccessToken(2, 'leehoosgg@gmail.com');
  });

  it('좋아요 활성', async () => {
    const response = await request(server).post('/diary/like/1').set('Cookie', `access-token=${token}`);
    expect(response.status).toBe(http.OK);
    expect(response.body).toEqual({ isMutual: false });

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
    expect(response.body).toEqual({ isMutual: false });

    const likes = await databaseConnector(async (conn: Connection) => {
      const sql = 'select likes from diary where id = 1';
      const [result] = await conn.execute(sql);
      return result[0].likes;
    })();
    expect(likes).toEqual(0);
  });

  it('커플이 되는 서로 좋아요', async () => {
    const response = await request(server).post('/diary/like/3').set('Cookie', `access-token=${token}`);
    expect(response.status).toBe(http.OK);
    expect(response.body).toEqual({ isMutual: true });

    await databaseConnector(async (conn: Connection) => {
      const sql = 'select count(*) as count from couple where user1_id = 2 and user2_id = 46';
      const [result] = await conn.execute(sql);
      expect(result[0].count).toBe(1);
    })();
  });

  it('이미 커플끼리 서로 좋아요', async () => {
    const response = await request(server).post('/diary/like/37').set('Cookie', `access-token=${token}`);
    expect(response.status).toBe(http.OK);
    expect(response.body).toEqual({ isMutual: true });

    await databaseConnector(async (conn: Connection) => {
      const sql = 'select count(*) as count from couple where user1_id = 25 and user2_id = 46';
      const [result] = await conn.execute(sql);
      expect(result[0].count).toBe(1);
    })();
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
