import { MyPreference } from '@schemas/myProfile.schema';
import CustomError from '@src/error';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';

export const selectMyPreference = async (conn: Connection, user_id: number): Promise<MyPreference> => {
  let sql = 'select * from preference where user_id = :user_id';
  let values = { user_id: user_id };
  let [result] = await conn.execute(sql, values);
  if (!result[0]) throw new CustomError(http.NOT_FOUND, '선호 데이터가 존재하지 않습니다');

  return new MyPreference(result[0]);
};
