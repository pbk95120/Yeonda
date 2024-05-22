import { transactionWrapper } from '@middlewares/transactionWrapper.middleware';
import CustomError from '@src/error';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';

export const deleteTag = async (conn: Connection, id: number): Promise<void> => {
  let sql = 'select id from tag where id = :id';
  let values: {} = { id: id };
  let [result] = await conn.execute(sql, values);
  if (!result[0]) throw new CustomError(http.NOT_FOUND, '존재하지 않는 태그');

  const callback = async (id: number) => {
    sql = 'delete from tag where id = :id';
    await conn.execute(sql, values);
  };

  await transactionWrapper(conn, callback)(id);
};
