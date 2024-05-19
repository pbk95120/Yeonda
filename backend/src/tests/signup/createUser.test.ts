import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { server } from '@src/app';
import Database from '@src/db';
import 'dotenv/config';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';
import path from 'path';
import request from 'supertest';

const cleanUp = async (conn: Connection): Promise<void> => {
  let sql = "delete from user where email like '%faker%'";
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

describe('POST /signup 회원 가입 요청', () => {
  let form;

  const requestWithImage = async () => {
    let agent = request(server)
      .post('/signup')
      .set('Content-Type', 'multipart/form-data')
      .attach('picture', path.join(__dirname, '..', 'mocks', 'mock.png'));
    for (const [key, value] of Object.entries(form)) {
      agent.field(key, value);
    }
    return agent;
  };

  const requestWithoutImage = async () => {
    let agent = request(server).post('/signup').set('Content-Type', 'multipart/form-data');
    for (const [key, value] of Object.entries(form)) {
      agent.field(key, value);
    }
    return agent;
  };

  beforeEach(() => {
    form = {
      nickname: '페이커',
      email: 'faker@gmail.com',
      password: 'faker12345',
      password_check: 'faker12345',
      gender: 'Male',
      birth: '2000-01-01',
      address: '서울 서초구 강남대로 327',
      prefer_gender: 'Female',
      distance: '50',
      start_age: '20',
      end_age: '30',
      tags: '4,5,124',
    };
  });

  it('사진을 포함한 정상 요청', async () => {
    const response = await requestWithImage();
    expect(response.status).toBe(http.CREATED);

    let result = await databaseConnector(async (conn: Connection) => {
      const sql = `select detail from address where detail = '${form.address}'`;
      const [result] = await conn.execute(sql);
      return result[0];
    })();
    expect(result.detail).toBe(form.address);

    result = await databaseConnector(async (conn: Connection) => {
      const sql = `select email, picture_url from user where email = '${form.email}'`;
      const [result] = await conn.execute(sql);
      return result[0];
    })();
    expect(result.email).toBe(form.email);
    expect(result.picture_url).toContain(process.env.FILE_BASE_USER);

    result = await databaseConnector(async (conn: Connection) => {
      const sql = `select p.distance from preference p join user u on u.id = p.user_id where u.email = '${form.email}'`;
      const [result] = await conn.execute(sql);
      return result[0];
    })();
    expect(result.distance).toBe(parseInt(form.distance));

    result = await databaseConnector(async (conn: Connection) => {
      const sql = `select ut.tag_id from user_tag ut join user u on u.id = ut.user_id where u.email = '${form.email}'`;
      const [result] = await conn.execute(sql);
      return result;
    })();
    const tags = form.tags.split(',').map((e) => parseInt(e));
    for (let i = 0; i < tags.length; i++) {
      expect(result[i].tag_id).toBe(tags[i]);
    }
  });

  it('사진을 포함하지 않은 정상 요청', async () => {
    form.email = 'faker2@gmail.com';
    const response = await requestWithoutImage();
    expect(response.status).toBe(http.CREATED);

    const result = await databaseConnector(async (conn: Connection) => {
      const sql = `select email, picture_url from user where email = '${form.email}'`;
      const [result] = await conn.execute(sql);
      return result[0];
    })();
    expect(result.email).toBe(form.email);
    expect(result.picture_url).toBe(null);
  });

  it('새로운 주소로 정상 요청', async () => {
    form.email = 'faker3@gmail.com';
    form.address = '충청남도 아산시 염치읍 현충사길 126';
    const response = await requestWithoutImage();
    expect(response.status).toBe(http.CREATED);

    let result = await databaseConnector(async (conn: Connection) => {
      const sql = `select id from address where detail = '${form.address}'`;
      const [result] = await conn.execute(sql);
      if (result[0]) return true;
      else return false;
    })();
    expect(result).toBeTruthy();

    result = await databaseConnector(async (conn: Connection) => {
      const sql = `select email, picture_url from user where email = '${form.email}'`;
      const [result] = await conn.execute(sql);
      return result[0];
    })();
    expect(result.email).toBe(form.email);
    expect(result.picture_url).toBe(null);
  });

  it('필수 항목 누락', async () => {
    form.email = '';
    const response = await requestWithImage();
    expect(response.status).toBe(http.BAD_REQUEST);
  });

  it('잘못된 비밀번호 양식', async () => {
    form.password = 'password!@';
    form.password_check = 'password!@';
    const response = await requestWithImage();
    expect(response.status).toBe(http.BAD_REQUEST);
  });

  it('비밀번호 불일치', async () => {
    form.password_check = 'faker54321';
    const response = await requestWithImage();
    expect(response.status).toBe(http.BAD_REQUEST);
  });

  it('잘못된 파일 양식', async () => {
    let agent = request(server)
      .post('/signup')
      .set('Content-Type', 'multipart/form-data')
      .attach('picture', path.join(__dirname, '..', 'mocks', 'mock.txt'));
    for (const [key, value] of Object.entries(form)) {
      agent.field(key, value);
    }
    const response = await agent;
    expect(response.status).toBe(http.BAD_REQUEST);
  });

  it('중복 요청', async () => {
    form.email = 'constant@gmail.com';
    const response = await requestWithImage();
    expect(response.status).toBe(http.CONFLICT);
  });
});
