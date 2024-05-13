import { analysisSchema } from '@schemas/admin.schema';
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

describe('Get /admin/user/analysis 관리자 이용자 분석', () => {
  it('관리자 계정 비정상 접근', async () => {
    const response = await request(app).get('/admin/user/analysis');
    expect(response.status).toBe(http.UNAUTHORIZED);
  });
  it('오늘 여성, 남성 유저수, 2주 이내 일기 작성하지 않은 유저 목록', async () => {
    const token = issueToken('admin');
    const response = await request(app).get('/admin/user/analysis').set('Cookie', `access-token=${token}`);
    expect(response.status).toBe(http.OK);
    const { error } = analysisSchema.validate(response.body);
    expect(error).toBeUndefined();
  });
});
