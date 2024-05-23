import { FirstRandomDiaryResponseSchema } from '@schemas/diary.schema';
import { server } from '@src/app';
import Database from '@src/db';
import { issueAccessToken } from '@utils/issueToken';
import http from 'http-status-codes';
import request from 'supertest';

beforeAll(async () => {
  Database.switchToTest();
});

afterAll(async () => {
  Database.closePool();
});

describe('POST /diary/pre-random 첫 랜덤 일기 가져오기', () => {
  let token;
  let form;

  beforeEach(() => {
    token = issueAccessToken(1, 'constant@gmail.com');
    form = {
      gender: 'Female',
      distance: 100,
      start_age: 20,
      end_age: 30,
    };
  });

  it('정상 요청', async () => {
    const response = await request(server).post('/diary/pre-random').set('Cookie', `access-token=${token}`).send(form);
    expect(response.status).toBe(http.OK);

    console.log(response.body);

    const { error } = FirstRandomDiaryResponseSchema.validate(response.body);
    expect(error).toBeUndefined();
  });

  it('조건에 맞는 일기가 하나 밖에 없음', async () => {
    token = issueAccessToken(129, 'randomDiaryTest@gmail.com');
    form.distance = 10;
    const response = await request(server).post('/diary/pre-random').set('Cookie', `access-token=${token}`).send(form);
    expect(response.status).toBe(http.OK);

    console.log(response.body);

    const { error } = FirstRandomDiaryResponseSchema.validate(response.body);
    expect(error).toBeUndefined();
    expect(response.body.prefer_id).toEqual([]);
  });

  it('선호 성별이 중성인 경우', async () => {
    token = issueAccessToken(129, 'randomDiaryTest@gmail.com');
    form.gender = 'Neutral';
    const response = await request(server).post('/diary/pre-random').set('Cookie', `access-token=${token}`).send(form);
    expect(response.status).toBe(http.OK);

    console.log(response.body);

    const { error } = FirstRandomDiaryResponseSchema.validate(response.body);
    expect(error).toBeUndefined();
  });

  it('조건에 맞는 일기 작성자 없음', async () => {
    token = issueAccessToken(129, 'randomDiaryTest@gmail.com');
    form.gender = 'Male';
    const response = await request(server).post('/diary/pre-random').set('Cookie', `access-token=${token}`).send(form);
    expect(response.status).toBe(http.NOT_FOUND);
  });

  it('조건에 맞는 일기 작성자는 있으나 일기가 없음', async () => {
    token = issueAccessToken(129, 'randomDiaryTest@gmail.com');
    form.gender = 'Male';
    const response = await request(server).post('/diary/pre-random').set('Cookie', `access-token=${token}`).send(form);
    expect(response.status).toBe(http.NOT_FOUND);
  });

  it('토큰 없음', async () => {
    const response = await request(server).post('/diary/pre-random').send(form);
    expect(response.status).toBe(http.UNAUTHORIZED);
  });

  it('잘못된 선호도 양식', async () => {
    form.distance = '100';
    const response = await request(server).post('/diary/pre-random').set('Cookie', `access-token=${token}`).send(form);
    expect(response.status).toBe(http.BAD_REQUEST);
  });

  it('조건에 맞는 일기 없음', async () => {
    form.start_age = 40;
    form.end_age = 50;
    const response = await request(server).post('/diary/pre-random').set('Cookie', `access-token=${token}`).send(form);
    expect(response.status).toBe(http.NOT_FOUND);
  });
});
