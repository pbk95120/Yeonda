import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { server } from '@src/app';
import Database from '@src/db';
import { issueAccessToken } from '@utils/issueToken';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';
import request from 'supertest';

const cleanUp = async (conn: Connection): Promise<void> => {
  let sql = 'update user set address_id = 1 where id = 1';
  await conn.execute(sql);

  sql = "delete from address where detail = '충청남도 아산시 염치읍 현충사길 126'";
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

describe('PATCH /profile/my/setting/address 주소 수정', () => {
  let token;

  beforeEach(() => {
    token = issueAccessToken(1, 'constant@gmail.com');
  });

  it('이미 데이터 베이스에 있는 주소로 정상 요청', async () => {
    const response = await request(server)
      .patch('/profile/my/setting/address')
      .set('Cookie', `access-token=${token}`)
      .send({
        address: '서울 서초구 반포대로 45',
      });
    expect(response.status).toBe(http.OK);

    const address_id = await databaseConnector(async (conn: Connection) => {
      const sql = "select address_id from user where email = 'constant@gmail.com'";
      const [result] = await conn.execute(sql);
      return result[0].address_id;
    })();
    expect(address_id).toEqual(2);
  });

  it('데이터 베이스에 없는 새 주소로 정상 요청', async () => {
    const response = await request(server)
      .patch('/profile/my/setting/address')
      .set('Cookie', `access-token=${token}`)
      .send({
        address: '충청남도 아산시 염치읍 현충사길 126',
      });
    expect(response.status).toBe(http.OK);

    const isSame = await databaseConnector(async (conn: Connection) => {
      let sql = "select id from address where detail = '충청남도 아산시 염치읍 현충사길 126'";
      let [result] = await conn.execute(sql);
      const address_id = result[0].id;

      sql = "select address_id from user where email = 'constant@gmail.com'";
      [result] = await conn.execute(sql);
      return address_id === result[0].address_id;
    })();
    expect(isSame).toEqual(true);
  });

  it('잘못된 주소 양식', async () => {
    const response = await request(server)
      .patch('/profile/my/setting/address')
      .set('Cookie', `access-token=${token}`)
      .send({
        address: `문자열의길이가100을넘어가는경우에대한테스트문자열의길이가100을넘어가는경우에대한테스트
        문자열의길이가100을넘어가는경우에대한테스트문자열의길이가100을넘어가는경우에대한테스트문자열의길이가
        100을넘어가는경우에대한테스트문자열의길이가100을넘어가는경우에대한테스트문자열의길이가100을넘어가는경우`,
      });
    expect(response.status).toBe(http.BAD_REQUEST);
  });

  it('address 값이 없는 경우', async () => {
    const response = await request(server)
      .patch('/profile/my/setting/address')
      .set('Cookie', `access-token=${token}`)
      .send({});
    expect(response.status).toBe(http.BAD_REQUEST);
  });

  it('존재할 수 없는 주소', async () => {
    const response = await request(server)
      .patch('/profile/my/setting/address')
      .set('Cookie', `access-token=${token}`)
      .send({
        address: '존재할수가없는주소입니다',
      });
    expect(response.status).toBe(http.BAD_REQUEST);
  });

  it('존재할법하나 검색되지는 않는 주소', async () => {
    const response = await request(server)
      .patch('/profile/my/setting/address')
      .set('Cookie', `access-token=${token}`)
      .send({
        address: '충청남도 아산시 염치읍 현충사길 9999',
      });
    expect(response.status).toBe(http.NOT_FOUND);
  });
});
