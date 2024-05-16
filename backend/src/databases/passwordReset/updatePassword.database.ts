import { transactionWrapper } from '@middlewares/transactionWrapper.middleware';
import { Connection } from 'mysql2/promise';

export const updatePassword = async (conn: Connection, user_id: number, password: string): Promise<void> => {
  const callback = async (user_id: string, password: string) => {
    const sql = 'update user set password = :password where id = :user_id';
    const values = { user_id: user_id, password: password };
    await conn.execute(sql, values);
  };

  await transactionWrapper(conn, callback)(user_id, password);
};
