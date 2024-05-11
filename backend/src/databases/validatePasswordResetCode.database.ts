import CustomError from '@src/error';
import { getUserIdByEmail } from '@utils/getUserIdByEmail';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';

export const validatePasswordResetCode = async (conn: Connection, email: string, code: string): Promise<void> => {
  const user_id = await getUserIdByEmail(conn, email);

  const sql = 'select count(*) as count from password_reset where user_id = :user_id and code = :code';
  const values = { user_id: user_id, code: code };
  const [result] = await conn.execute(sql, values);
  if (result[0].count === 0) throw new CustomError(http.UNAUTHORIZED, '올바르지 않은 이메일, 비밀번호 인증 코드');

  return;
};
