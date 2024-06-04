import { transactionWrapper } from '@middlewares/transactionWrapper.middleware';
import { Signout } from '@schemas/signout.schema';
import CustomError from '@src/error';
import { comparePassword } from '@utils/comparePassword';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';

export const deleteUser = async (conn: Connection, body: Signout): Promise<void> => {
  const { user_id, password } = body;

  let sql = 'select password from user where id = :user_id';
  let values: {} = { user_id: user_id };
  const [result] = await conn.execute(sql, values);

  const isSame = await comparePassword(password, result[0].password);
  if (!isSame) throw new CustomError(http.UNAUTHORIZED, '비밀번호 확인 입력 틀림');

  const callback = async (user_id: number) => {
    sql = 'delete from user where id = :user_id';
    values = { user_id: user_id };
    await conn.execute(sql, values);
  };

  await transactionWrapper(conn, callback)(user_id);
};
