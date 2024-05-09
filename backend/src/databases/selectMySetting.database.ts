import CustomError from '@src/error';
import { MySetting } from '@src/schemas/myProfile.schema';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';

export const selectMySetting = async (conn: Connection, email: string): Promise<MySetting> => {
  let sql = `select u.picture_url, a.detail from user u 
  join address a on u.address_id = a.id where u.email = :email`;
  let values = { email: email };
  const [result] = await conn.execute(sql, values);
  if (!result[0]) throw new CustomError(http.NOT_FOUND, '존재하지 않는 사용자');
  return result[0];
};
