import { databaseConnector } from '@middlewares/databaseConnector';
import { server } from '@src/app';
import Database from '@src/db';
import { issueToken } from '@utils/issueToken';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';
import request from 'supertest';

const cleanUp = async (conn: Connection): Promise<void> => {
  let sql = 'delete from user_tag where user_id = 1';
  await conn.execute(sql);

  let originTags = [1, 2, 3];
  for (const t of originTags) {
    sql = `insert into user_tag values(1, ${t})`;
    await conn.execute(sql);
  }
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

describe('PUT /profile/my/tag 회원 선호 태그 수정', () => {
  let token;

  beforeEach(() => {
    token = issueToken('constant@gmail.com');
  });

  it('정상 요청', async () => {
    const response = await request(server).put('/profile/my/tag').set('Cookie', `access-token=${token}`).send({
      tags: '4,5,6',
    });
    expect(response.status).toBe(http.OK);

    const tags = await databaseConnector(async (conn: Connection) => {
      const sql = 'select tag_id from user_tag where user_id = 1';
      const [result] = await conn.execute(sql);
      return result;
    })();
    expect(tags).toEqual([
      {
        tag_id: 4,
      },
      {
        tag_id: 5,
      },
      {
        tag_id: 6,
      },
    ]);
  });

  it('토큰 없음', async () => {
    const response = await request(server).put('/profile/my/tag').send({
      tags: '4,5,6',
    });
    expect(response.status).toBe(http.UNAUTHORIZED);
  });

  it('태그 없음', async () => {
    const response = await request(server).put('/profile/my/tag').set('Cookie', `access-token=${token}`).send({
      blabla: 'bla',
    });
    expect(response.status).toBe(http.BAD_REQUEST);
  });

  it('잘못된 태그 양식', async () => {
    const response = await request(server)
      .put('/profile/my/tag')
      .set('Cookie', `access-token=${token}`)
      .send({
        tags: [5, 6, 7],
      });
    expect(response.status).toBe(http.BAD_REQUEST);
  });

  it('존재하지 않는 사용자', async () => {
    token = issueToken('faker@gmail.com');
    const response = await request(server).put('/profile/my/tag').set('Cookie', `access-token=${token}`).send({
      tags: '4,5,6',
    });
    expect(response.status).toBe(http.NOT_FOUND);
  });

  it('존재하지 않는 태그', async () => {
    const response = await request(server).put('/profile/my/tag').set('Cookie', `access-token=${token}`).send({
      tags: '5, 6, 9999',
    });
    expect(response.status).toBe(http.BAD_REQUEST);
  });
});
