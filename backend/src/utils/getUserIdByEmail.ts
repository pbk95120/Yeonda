import CustomError from '@src/error';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';

export const getUserIdByEmail = async (conn: Connection, email: string): Promise<number> => {
  const sql = 'select id from user where email =:email';
  const values = { email: email };
  const [result] = await conn.execute(sql, values);
  if (result[0]) return result[0].id;
  else throw new CustomError(http.NOT_FOUND, '존재하지 않는 사용자');
};
