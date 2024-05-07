import app from '@src/app';
import { issueToken } from '@utils/issueToken';
import request from 'supertest';

describe('POST /logout 로그아웃 요청', () => {
  it('access-token 제거', async () => {
    const token = issueToken('email');
    const res = await request(app).post('/logout').set('Set-Cookie', `access-token=${token}`);
    const cookie = res.headers['set-cookie'][0];
    expect(cookie).toBeDefined();

    const regex = /access-token=([^;]*)/;
    const match = cookie.match(regex);
    if (match && match[1].trim() === '') {
      expect(true).toBe(true);
    } else fail();
  });
});
