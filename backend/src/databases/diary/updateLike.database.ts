import { transactionWrapper } from '@middlewares/transactionWrapper.middleware';
import CustomError from '@src/error';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';

export const updateLike = async (conn: Connection, diary_id: number, user_id: number): Promise<void> => {
  let sql = 'select user_id from diary where id = :diary_id';
  let values: {} = { diary_id: diary_id };
  let [result] = await conn.execute(sql, values);
  if (!result[0]) throw new CustomError(http.NOT_FOUND, '존재하지 않는 일기에 대한 좋아요 요청');
  if (result[0]?.user_id === user_id) throw new CustomError(http.FORBIDDEN, '자신의 일기에는 좋아요 기능 안 됨');

  sql = 'select id from likes where diary_id = :diary_id and user_id = :user_id';
  values = { diary_id: diary_id, user_id: user_id };
  [result] = await conn.execute(sql, values);

  let callback;
  if (result[0]) {
    callback = async (diary_id: number, user_id: number) => {
      sql = 'delete from likes where diary_id = :diary_id and user_id = :user_id';
      values = { diary_id: diary_id, user_id: user_id };
      await conn.execute(sql, values);
    };
  } else {
    callback = async (diary_id: number, user_id: number) => {
      sql = 'insert into likes (diary_id, user_id) values (:diary_id, :user_id)';
      values = { diary_id: diary_id, user_id: user_id };
      await conn.execute(sql, values);
    };
  }

  await transactionWrapper(conn, callback)(diary_id, user_id);
};
