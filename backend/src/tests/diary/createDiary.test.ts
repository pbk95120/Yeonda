import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { server } from '@src/app';
import Database from '@src/db';
import { issueAccessToken } from '@utils/issueToken';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';
import request from 'supertest';

const cleanUp = async (conn: Connection): Promise<void> => {
  let sql = 'select id from diary where user_id = 1 order by created_at desc limit 1';
  let [result] = await conn.execute(sql);
  const diary_id = result[0].id;

  sql = `delete from diary where id = ${diary_id}`;
  await conn.execute(sql);

  sql = `select * from diary_tag where diary_id = ${diary_id}`;
  [result] = await conn.execute(sql);
  if (result[0]) throw new Error('다이어리 태그 삭제 안 됨');
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

describe('POST /diary 일기 작성', () => {
  let token;

  beforeEach(() => {
    token = issueAccessToken(1, 'constant@gmail.com');
  });

  it('정상 요청', async () => {
    const response = await request(server)
      .post('/diary')
      .set('Cookie', `access-token=${token}`)
      .send({
        title: '프로그래머스 프로젝트가 끝난 후',
        content: `
        프로젝트 발표가 끝난 다음날 아침에 일어나 온천에서 푹 쉬었음, 오후에는 닌텐도 게임을 하고, 저녁에는 롤 msi 결승을 시청함
        내일은 오토바이 타고 BBQ 에 치킨을 뜯으러 갈꺼임
        `,
      });
    expect(response.status).toBe(http.CREATED);

    await databaseConnector(async (conn: Connection) => {
      let sql = 'select id from diary where user_id = 1 order by created_at desc limit 1';
      let [result] = await conn.execute(sql);
      if (!result[0]) throw new Error();
      const diary_id = result[0].id;
      expect(diary_id === 1).toBeFalsy();

      sql = `select count(*) as count from diary_tag where diary_id = ${diary_id}`;
      [result] = await conn.execute(sql);
      expect(result[0].count).toEqual(5);
    })();
  });

  it('토큰 없음', async () => {
    const response = await request(server)
      .post('/diary')
      .send({
        title: '프로그래머스 프로젝트가 끝난 후',
        content: `
        프로젝트 발표가 끝난 다음날 아침에 일어나 온천에서 푹 쉬었음, 오후에는 닌텐도 게임을 하고, 저녁에는 롤 msi 결승을 시청함
        내일은 오토바이 타고 BBQ 에 치킨을 뜯으러 갈꺼임
        `,
      });
    expect(response.status).toBe(http.UNAUTHORIZED);
  });

  it('키가 빠진 요청', async () => {
    const response = await request(server).post('/diary').set('Cookie', `access-token=${token}`).send({
      title: '프로그래머스 프로젝트가 끝난 후',
    });
    expect(response.status).toBe(http.BAD_REQUEST);
  });

  it('값의 유형이 잘못된 요청', async () => {
    const response = await request(server)
      .post('/diary')
      .set('Cookie', `access-token=${token}`)
      .send({
        title: 123,
        content: `
        프로젝트 발표가 끝난 다음날 아침에 일어나 온천에서 푹 쉬었음, 오후에는 닌텐도 게임을 하고, 저녁에는 롤 msi 결승을 시청함
        내일은 오토바이 타고 BBQ 에 치킨을 뜯으러 갈꺼임
        `,
      });
    expect(response.status).toBe(http.BAD_REQUEST);
  });

  it('너무 긴 제목 값', async () => {
    const response = await request(server)
      .post('/diary')
      .set('Cookie', `access-token=${token}`)
      .send({
        title: `너무너무긴제목너무너무긴제목너무너무긴제목너무너무긴제목너무너무긴제목너무너무긴제목너무너무긴제목너무너무긴제목
        너무너무긴제목너무너무긴제목너무너무긴제목너무너무긴제목너무너무긴제목너무너무긴제목너무너무긴제목너무너무긴제목너무너무긴제목`,
        content: `
        프로젝트 발표가 끝난 다음날 아침에 일어나 온천에서 푹 쉬었음, 오후에는 닌텐도 게임을 하고, 저녁에는 롤 msi 결승을 시청함
        내일은 오토바이 타고 BBQ 에 치킨을 뜯으러 갈꺼임
        `,
      });
    expect(response.status).toBe(http.BAD_REQUEST);
  });
});
