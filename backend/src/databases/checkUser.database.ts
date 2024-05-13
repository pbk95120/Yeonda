import CustomError from '@src/error';
import { comparePassword } from '@utils/comparePassword';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';

export const checkUser = async (conn: Connection, email: string, password: string): Promise<number> => {
  let sql = 'select id, password from user where email = :email';
  let values = { email: email };
  const [result] = await conn.execute(sql, values);
  if (!result[0]) throw new CustomError(http.NOT_FOUND, '존재하지 않는 사용자');
  const encryptedPassword = result[0].password;

  const isSame = await comparePassword(password, encryptedPassword);
  if (!isSame) throw new CustomError(http.UNAUTHORIZED, '로그인하려는 사용자와 비밀번호 불일치');

  return result[0].id;
};
