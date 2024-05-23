import { S3Save } from '@middlewares/S3Save.middleware';
import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { server } from '@src/app';
import Database from '@src/db';
import { issueAccessToken } from '@utils/issueToken';
import fs from 'fs';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';
import path from 'path';
import request from 'supertest';

const cleanUp = async (conn: Connection): Promise<void> => {
  const filePath = path.join(__dirname, '..', 'mocks', 'mock.png');
  const buffer = fs.readFileSync(filePath);
  const file: Express.Multer.File = {
    fieldname: 'file',
    originalname: 'mock.png',
    encoding: '7bit',
    mimetype: 'image/png',
    size: buffer.length,
    buffer: buffer,
    stream: fs.createReadStream(filePath),
    destination: path.dirname(filePath),
    filename: path.basename(filePath),
    path: filePath,
  };
  const picture_url = await S3Save(file);

  let sql = `update user set picture_url = '${picture_url}' where id = 2`;
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

describe('DELETE 프로필 사진 삭제', () => {
  let token;

  beforeEach(() => {
    token = issueAccessToken(2, 'leehoosgg@gmail.com');
  });

  it('정상 요청', async () => {
    const response = await request(server).delete('/profile/my/setting/picture').set('Cookie', `access-token=${token}`);
    expect(response.status).toBe(http.OK);

    await databaseConnector(async (conn: Connection) => {
      const sql = 'select picture_url from user where id = 2';
      const [result] = await conn.execute(sql);
      expect(result[0].picture_url).toBeNull();
    });
  });

  it('토큰 없음', async () => {
    const response = await request(server).delete('/profile/my/setting/picture');
    expect(response.status).toBe(http.UNAUTHORIZED);
  });

  it('삭제할 사진 없음', async () => {
    token = issueAccessToken(3, 'far0@gmail.com');
    const response = await request(server).delete('/profile/my/setting/picture').set('Cookie', `access-token=${token}`);
    expect(response.status).toBe(http.NOT_FOUND);
  });
});
