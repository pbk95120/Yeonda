import { server } from '@src/app';
import Database from '@src/db';
import http from 'http-status-codes';
import request from 'supertest';

beforeAll(async () => {
  Database.switchToTest();
});

afterAll(async () => {
  Database.closePool();
});

describe('GET /profile/your/:id ', () => {
  it('정상 요청', async () => {
    const response = await request(server).get('/profile/your/1');
    expect(response.status).toBe(http.OK);
    expect(response.body).toEqual({
      email: 'constant@gmail.com',
      nickname: 'constant',
      picture_url: 'constant',
    });
  });

  it('잘못된 URL', async () => {
    const response = await request(server).get('/profile/your/me');
    expect(response.status).toBe(http.BAD_REQUEST);
  });

  it('존재하지 않는 사용자', async () => {
    const response = await request(server).get('/profile/your/999');
    expect(response.status).toBe(http.NOT_FOUND);
  });
});
