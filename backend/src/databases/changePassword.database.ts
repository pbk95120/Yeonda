import CustomError from '@src/error';
import { transactionWrapper } from '@src/middlewares/transactionWrapper';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';

export const changePassword = async (conn: Connection, email: string, password: string): Promise<void> => {
  let sql = 'select email from user where email = :email';
  let values: {} = { email: email };
  const [result] = await conn.execute(sql, values);
  if (!result[0]) throw new CustomError(http.NOT_FOUND, '존재하지 않는 사용자');

  const callback = async (email: string, password: string) => {
    sql = 'update user set password = :password where email = :email';
    values = { email: email, password: password };
    await conn.execute(sql, values);
  };

  await transactionWrapper(conn, callback)(email, password);
};
