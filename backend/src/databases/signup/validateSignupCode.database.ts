import CustomError from '@src/error';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';

export const validateSignupCode = async (conn: Connection, email: string, code: string): Promise<void> => {
  let sql = 'select count(*) as count from signup where email = :email and code = :code';
  let values: {} = { email: email, code: code };
  const [result] = await conn.execute(sql, values);
  if (result[0].count === 0) throw new CustomError(http.UNAUTHORIZED, '해당하는 이메일, 회원 가입 인증 코드 없음');

  return;
};
