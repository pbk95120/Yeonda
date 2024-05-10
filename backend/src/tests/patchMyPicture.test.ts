import { databaseConnector } from '@middlewares/databaseConnector';
import { server } from '@src/app';
import Database from '@src/db';
import { issueToken } from '@src/utils/issueToken';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';
import path from 'path';
import request from 'supertest';

const cleanUp = async (conn: Connection): Promise<void> => {
  let sql = "update user set picture_url = 'constant' where email = 'constant@gmail.com'";
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

describe('PATCH /profile/my/picture 프로필 사진 수정', () => {
  let token;

  beforeEach(() => {
    token = issueToken('constant@gmail.com');
  });

  it('정상 요청', async () => {
    const response = await request(server)
      .patch('/profile/my/setting/picture')
      .set('Content-Type', 'multipart/form-data')
      .set('Cookie', `access-token=${token}`)
      .attach('picture', path.join(__dirname, 'mocks', 'mock.png'));
    expect(response.status).toBe(http.OK);

    const url = await databaseConnector(async (conn: Connection): Promise<string> => {
      const sql = "select picture_url from user where email = 'constant@gmail.com'";
      const [result] = await conn.execute(sql);
      return result[0].picture_url;
    })();
    expect(url).toContain('.png');
  });

  it('토큰 없음', async () => {
    const response = await request(server)
      .patch('/profile/my/setting/picture')
      .set('Content-Type', 'multipart/form-data')
      .attach('picture', path.join(__dirname, 'mocks', 'mock.png'));
    expect(response.status).toBe(http.UNAUTHORIZED);
  });

  it('첨부 파일 picture 필드가 없음', async () => {
    const response = await request(server)
      .patch('/profile/my/setting/picture')
      .set('Content-Type', 'multipart/form-data')
      .set('Cookie', `access-token=${token}`);
    expect(response.status).toBe(http.INTERNAL_SERVER_ERROR);
  });

  it('필드는 있으나 첨부 파일이 없음', async () => {
    const response = await request(server)
      .patch('/profile/my/setting/picture')
      .set('Content-Type', 'multipart/form-data')
      .set('Cookie', `access-token=${token}`)
      .attach('picture', Buffer.from(''));
    expect(response.status).toBe(http.BAD_REQUEST);
  });

  it('잘못된 확장자', async () => {
    const response = await request(server)
      .patch('/profile/my/setting/picture')
      .set('Content-Type', 'multipart/form-data')
      .set('Cookie', `access-token=${token}`)
      .attach('picture', path.join(__dirname, 'mocks', 'mock.txt'));
    expect(response.status).toBe(http.BAD_REQUEST);
  });

  it('존재하지 않는 사용자', async () => {
    token = issueToken('faker@gmail.com');
    const response = await request(server)
      .patch('/profile/my/setting/picture')
      .set('Content-Type', 'multipart/form-data')
      .set('Cookie', `access-token=${token}`)
      .attach('picture', path.join(__dirname, 'mocks', 'mock.png'));
    expect(response.status).toBe(http.NOT_FOUND);
  });
});
