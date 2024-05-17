import { partnerChatlistSchema } from '@schemas/chat.schema';
import { server } from '@src/app';
import Database from '@src/db';
import { issueAccessToken } from '@src/utils/issueToken';
import http from 'http-status-codes';
import request from 'supertest';
import 'dotenv/config';

beforeAll(async () => {
  Database.switchToTest();
});

afterAll(async () => {
  Database.closePool();
});

describe('Get /chatlist 채팅 목록 페이지', () => {
  it('상대방 정보, 상대방과 마지막 채팅 정보', async () => {
    const token = issueAccessToken(parseInt(process.env.TEST_ID), process.env.TEST_EMAIL);
    const response = await request(server).get('/chatlist').set('Cookie', `access-token=${token}`);
    expect(response.status).toBe(http.OK);

    const { error } = partnerChatlistSchema.validate(response.body[0]);
    expect(error).toBeUndefined();
  });

  it('토큰 없는 접근', async () => {
    const response = await request(server).get('/chatlist');
    expect(response.status).toBe(http.UNAUTHORIZED);
  });
});
