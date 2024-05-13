import { server } from '@src/app';
import Database from '@src/db';
import { issueToken } from '@utils/issueToken';
import http from 'http-status-codes';
import request from 'supertest';

beforeAll(async () => {
  Database.switchToTest();
});

afterAll(async () => {
  Database.closePool();
});

describe('GET /profile/your/:id ', () => {
  let token;

  beforeEach(() => {
    token = issueToken('constant@gmail.com');
  });

  it('정상 요청', async () => {
    const response = await request(server).get('/profile/your/2').set('Cookie', `access-token=${token}`);
    expect(response.status).toBe(http.OK);
    expect(response.body).toEqual({
      email: 'leehoosgg@gmail.com',
      nickname: 'constant',
      picture_url: 'constant',
    });
  });

  it('토큰 없음', async () => {
    const response = await request(server).get('/profile/your/me');
    expect(response.status).toBe(http.UNAUTHORIZED);
  });

  it('잘못된 URL', async () => {
    const response = await request(server).get('/profile/your/me').set('Cookie', `access-token=${token}`);
    expect(response.status).toBe(http.BAD_REQUEST);
  });

  it('존재하지 않는 사용자', async () => {
    token = issueToken('faker@gmail.com');
    const response = await request(server).get('/profile/your/2').set('Cookie', `access-token=${token}`);
    expect(response.status).toBe(http.NOT_FOUND);
  });

  it('서로 좋아요가 아닌 사용자', async () => {
    const response = await request(server).get('/profile/your/3').set('Cookie', `access-token=${token}`);
    expect(response.status).toBe(http.UNAUTHORIZED);
  });
});
