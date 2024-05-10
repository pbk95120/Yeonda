import { transactionWrapper } from '@middlewares/transactionWrapper';
import CustomError from '@src/error';
import { getRandomCode } from '@utils/getRandomCode';
import { sendEmail } from '@utils/sendEmail';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';

export const sendPasswordResetEmail = async (conn: Connection, email: string): Promise<void> => {
  let sql = 'select id from user where email = :email';
  let values: {} = { email: email };
  let [result] = await conn.execute(sql, values);
  if (!result[0]) throw new CustomError(http.NOT_FOUND, '존재하지 않는 사용자');
  const user_id = result[0].id;

  sql = 'select count(*) as count from password_reset where user_id = :user_id';
  values = { user_id: user_id };
  [result] = await conn.execute(sql, values);
  if (result[0].count !== 0) throw new CustomError(http.CONFLICT, '이미 발급된 비밀번호 초기화 인증 코드 있음');

  const [code, time] = getRandomCode(6);

  const callback = async (user_id: string, code: string) => {
    sql = 'insert into password_reset (user_id, code) values(:user_id, :code)';
    values = { user_id: user_id, code: code };
    await conn.execute(sql, values);
  };

  await transactionWrapper(conn, callback)(user_id, code);

  await sendEmail(email, 'Yeonda 비밀번호 초기화 인증 코드입니다', `유효 기간: ${time} 인증 코드: ${code}`);

  return;
};
