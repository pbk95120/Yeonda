import CustomError from '@src/error';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';

export const validatePasswordResetCode = async (conn: Connection, email: string, code: string): Promise<void> => {
  let sql = 'select id from user where email = :email';
  let values: {} = { email: email };
  let [result] = await conn.execute(sql, values);
  if (!result[0]) throw new CustomError(http.NOT_FOUND, '존재하지 않는 사용자');
  const user_id = result[0].id;

  sql = 'select count(*) as count from password_reset where user_id = :user_id and code = :code';
  values = { user_id: user_id, code: code };
  [result] = await conn.execute(sql, values);
  if (result[0].count === 0) throw new CustomError(http.UNAUTHORIZED, '올바르지 않은 이메일, 비밀번호 인증 코드');

  return;
};
