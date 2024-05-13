import { ProfileInfo } from '@models/user.model';
import CustomError from '@src/error';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';

export const selectYourProfile = async (conn: Connection, id: number): Promise<ProfileInfo> => {
  let sql = 'select id from user where id = :id';
  let values: {} = { id: id };
  let [result] = await conn.execute(sql, values);
  if (!result[0]) throw new CustomError(http.NOT_FOUND, '존재하지 않는 사용자');

  sql = 'select email, nickname, picture_url from user where id = :id';
  [result] = await conn.execute(sql, values);
  return result[0] as ProfileInfo;
};
