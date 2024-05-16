import { VerifyCode } from '@schemas/passwordReset.schema';
import CustomError from '@src/error';
import { getUserIdByEmail } from '@utils/getUserIdByEmail';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';

export const validatePasswordResetCode = async (conn: Connection, body: VerifyCode): Promise<number> => {
  const { email, code } = body;
  const user_id = await getUserIdByEmail(conn, email);

  const sql = 'select user_id from password_reset where user_id = :user_id and code = :code';
  const values = { user_id: user_id, code: code };
  const [result] = await conn.execute(sql, values);
  if (!result[0]) throw new CustomError(http.UNAUTHORIZED, '해당하는 이메일, 비밀번호 인증 코드 없음');

  return result[0].user_id;
};
