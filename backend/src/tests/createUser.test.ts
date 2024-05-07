import fs from 'fs';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';
import path from 'path';
import request from 'supertest';
import app from '../app';
import Database from '../db';
import { databaseConnector } from '../middlewares/databaseConnector';

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
  let sql = "select picture_url from user where email = 'faker@gmail.com'";
  const [result] = await conn.execute(sql);
  if (result[0]) deleteFile(result[0].picture_url);

  sql = "delete from user where email = 'faker@gmail.com'";
  await conn.execute(sql);

  sql = 'delete from address where id != 1';
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
    let agent = request(app)
      .post('/signup')
      .set('Content-Type', 'multipart/form-data')
      .attach('picture', path.join(__dirname, 'mocks', 'mock.png'));
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

  it('정상 요청', async () => {
    const response = await requestFn();
    expect(response.status).toBe(http.CREATED);
  });

  it('필수 항목 누락', async () => {
    form.email = '';
    const response = await requestFn();
    expect(response.status).toBe(http.BAD_REQUEST);
  });

  it('잘못된 비밀번호 양식', async () => {
    form.password = 'password!@';
    form.password = 'password!@';
    const response = await requestFn();
    expect(response.status).toBe(http.BAD_REQUEST);
  });

  it('비밀번호 불일치', async () => {
    form.password_check = 'faker54321';
    const response = await requestFn();
    expect(response.status).toBe(http.BAD_REQUEST);
  });

  it('잘못된 파일 양식', async () => {
    let agent = request(app)
      .post('/signup')
      .set('Content-Type', 'multipart/form-data')
      .attach('picture', path.join(__dirname, 'mocks', 'mock.txt'));
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
