import { statisticSchema } from '@schemas/admin.schema';
import { server } from '@src/app';
import Database from '@src/db';
import { issueAccessToken } from '@utils/issueToken';
import 'dotenv/config';
import http from 'http-status-codes';
import request from 'supertest';

beforeAll(async () => {
  Database.switchToTest();
});

afterAll(async () => {
  Database.closePool();
});

describe('Get /admin/user/statistic 관리자 이용자 통계', () => {
  it('오늘 날짜 index, 일주일의 (다이어리, 매칭, 유저) 수', async () => {
    const token = issueAccessToken(parseInt(process.env.ADMIN_ID), process.env.ADMIN_EMAIL);
    const response = await request(server).get('/admin/user/statistic').set('Cookie', `access-token=${token}`);
    expect(response.status).toBe(http.OK);
    const { error } = statisticSchema.validate(response.body);
    expect(error).toBeUndefined();
  });

  it('관리자 계정 비정상 접근', async () => {
    const response = await request(server).get('/admin/user/statistic');
    expect(response.status).toBe(http.UNAUTHORIZED);
  });
});
