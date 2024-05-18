import { transactionWrapper } from '@middlewares/transactionWrapper.middleware';
import CustomError from '@src/error';
import { getRandomCode } from '@utils/getRandomCode';
import { sendEmail } from '@utils/sendEmail';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';

export const sendSignupEmail = async (conn: Connection, email: string): Promise<void> => {
  let sql = 'select email from signup where email = :email';
  let values: {} = { email: email };
  let [result] = await conn.execute(sql, values);
  if (result[0]) throw new CustomError(http.CONFLICT, '이미 전송한 회원 가입용 이메일 인증 코드가 있습니다');

  const [code, time] = getRandomCode(6);

  const callback = async (email: string, code: string) => {
    sql = 'insert into signup (email, code) values ( :email, :code )';
    values = { email: email, code: code };
    await conn.execute(sql, values);

    await sendEmail(email, 'Yeonda 회원 가입 인증 코드입니다', `유효 기간: ${time} 인증 코드: ${code}`);
  };

  await transactionWrapper(conn, callback)(email, code);
};
