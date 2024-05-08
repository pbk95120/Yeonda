import app from '@src/app';
import Database from '@src/db';
import { issueToken } from '@src/utils/issueToken';
import http from 'http-status-codes';
import request from 'supertest';

beforeAll(async () => {
  Database.switchToTest();
});

afterAll(async () => {
  Database.closePool();
});

describe('GET /profile/my 회원 정보 가져오기', () => {
  it('정상 요청', async () => {
    const token = issueToken('constant@gmail.com');
    const response = await request(app).get('/profile/my').set('Cookie', `access-token=${token}`);
    expect(response.status).toBe(http.OK);
    expect(response.body).toEqual({
      id: 1,
      email: 'constant@gmail.com',
      nickname: 'constant',
      gender: 'Male',
      birth: '2000-01-01',
      picture_url: 'constant',
      latitude: '37.492064',
      longitude: '127.029796',
      detail: '서울 서초구 강남대로 327',
      tags: [1, 2, 3],
    });
  });

  it('토큰 없음', async () => {
    const response = await request(app).get('/profile/my');
    expect(response.status).toBe(http.UNAUTHORIZED);
  });

  it('존재하지 않는 사용자', async () => {
    const token = issueToken('faker@gmail.com');
    const response = await request(app).get('/profile/my').set('Cookie', `access-token=${token}`);
    expect(response.status).toBe(http.NOT_FOUND);
  });
});
