import CustomError from '@src/error';
import { MyPreference } from '@src/schemas/myProfile.schema';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';

export const selectMyPreference = async (conn: Connection, email: string): Promise<MyPreference> => {
  let sql = 'select id from user where email = :email';
  let values: {} = { email: email };
  let [result] = await conn.execute(sql, values);
  if (!result[0]) throw new CustomError(http.NOT_FOUND, '존재하지 않는 사용자');
  const user_id = result[0].id;

  sql = 'select * from preference where user_id = :user_id';
  values = { user_id: user_id };
  [result] = await conn.execute(sql, values);
  return new MyPreference(result[0]);
};
