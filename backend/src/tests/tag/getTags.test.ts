import { selectTags } from '@databases/tag/selectTags.database';
import { databaseConnector } from '@middlewares/databaseConnector.middleware';
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

describe('GET /tag 태그 목록 가져오기', () => {
  it('정상 요청', async () => {
    const response = await request(server).get('/tag');
    expect(response.status).toBe(http.OK);

    const tags = await databaseConnector(selectTags)();
    expect(response.body).toEqual(tags);
  });
});
