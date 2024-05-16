import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { server } from '@src/app';
import Database from '@src/db';
import fs from 'fs';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';
import path from 'path';
import request from 'supertest';

const deleteFile = (path: string) => {
  fs.unlink(path, (err) => {
    if (err) {
      console.log(path);
      console.log('파일 삭제 오류', err);
      return;
    }
  });
};

const cleanUp = async (conn: Connection): Promise<void> => {
  let sql = "select picture_url from user where email like '%faker%'";
  const [result] = await conn.execute(sql);
  if (result[0].picture_url !== null) deleteFile(result[0].picture_url);

  sql = "delete from user where email like '%faker%'";
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

  const requestFn = async () => {
    let agent = request(server)
      .post('/signup')
      .set('Content-Type', 'multipart/form-data')
      .attach('picture', path.join(__dirname, '..', 'mocks', 'mock.png'));
    for (const [key, value] of Object.entries(form)) {
      agent.field(key, value);
    }
    return agent;
  };

  const requestFn2 = async () => {
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
    const response = await requestFn();
    expect(response.status).toBe(http.CREATED);

    const result = await databaseConnector(async (conn: Connection) => {
      const sql = "select id from user where email = 'faker@gmail.com'";
      const [result] = await conn.execute(sql);
      return result[0];
    })();
    if (!result) throw new Error();
  });

  it('사진을 포함하지 않은 정상 요청', async () => {
    form.email = 'faker2@gmail.com';
    const response = await requestFn2();
    expect(response.status).toBe(http.CREATED);

    const result = await databaseConnector(async (conn: Connection) => {
      const sql = "select id from user where email = 'faker2@gmail.com'";
      const [result] = await conn.execute(sql);
      return result[0];
    })();
    if (!result) throw new Error();
  });

  it('새로운 주소로 정상 요청', async () => {
    form.email = 'faker3@gmail.com';
    form.address = '충청남도 아산시 염치읍 현충사길 126';
    const response = await requestFn2();
    expect(response.status).toBe(http.CREATED);

    const result = await databaseConnector(async (conn: Connection) => {
      const sql = "select id from user where email = 'faker3@gmail.com'";
      const [result] = await conn.execute(sql);
      return result[0];
    })();
    if (!result) throw new Error();
  });

  it('필수 항목 누락', async () => {
    form.email = '';
    const response = await requestFn();
    expect(response.status).toBe(http.BAD_REQUEST);
  });

  it('잘못된 비밀번호 양식', async () => {
    form.password = 'password!@';
    form.password_check = 'password!@';
    const response = await requestFn();
    expect(response.status).toBe(http.BAD_REQUEST);
  });

  it('비밀번호 불일치', async () => {
    form.password_check = 'faker54321';
    const response = await requestFn();
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
    const response = await requestFn();
    expect(response.status).toBe(http.CONFLICT);
  });
});
