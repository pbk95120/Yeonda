import { transactionWrapper } from '@middlewares/transactionWrapper';
import { PatchMyPreference } from '@schemas/myProfile.schema';
import CustomError from '@src/error';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';

export const updateMyPreference = async (conn: Connection, preference: PatchMyPreference): Promise<void> => {
  let sql = 'select id from user where email = :email';
  let values: {} = { email: preference.email };
  const [result] = await conn.execute(sql, values);
  if (!result[0]) throw new CustomError(http.NOT_FOUND, '존재하지 않는 사용자');
  const user_id = result[0].id;

  const callback = async (user_id: number, p: PatchMyPreference) => {
    sql = `update preference set gender = :gender, distance = :distance, start_age = :start_age, end_age = :end_age
    where user_id = :user_id`;
    values = { gender: p.gender, distance: p.distance, start_age: p.start_age, end_age: p.end_age, user_id: user_id };
    await conn.execute(sql, values);
  };

  await transactionWrapper(conn, callback)(user_id, preference);
};
