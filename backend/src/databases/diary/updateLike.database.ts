import { transactionWrapper } from '@middlewares/transactionWrapper.middleware';
import CustomError from '@src/error';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';

export const updateLike = async (conn: Connection, diary_id: number, user_id: number): Promise<boolean> => {
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
      return false;
    };
  } else {
    callback = async (diary_id: number, user_id: number) => {
      sql = 'insert into likes (diary_id, user_id) values (:diary_id, :user_id)';
      values = { diary_id: diary_id, user_id: user_id };
      await conn.execute(sql, values);

      sql = `
      select 
          case 
              when count(*) > 0 then true
              else false
          end as isMutual, d1.user_id
      from likes l
      join diary d1 on l.user_id = d1.user_id
      join diary d2 on l.diary_id = d2.id
      where d1.id = :diary_id and d2.user_id = :user_id
      group by d1.user_id
      `;
      [result] = await conn.execute(sql, values);

      if (result[0]?.isMutual === 1) {
        const user2_id = result[0].user_id;
        const couple1 = user_id < user2_id ? user_id : user2_id;
        const couple2 = user_id > user2_id ? user_id : user2_id;

        sql = 'select id from couple where user1_id = :user1_id and user2_id = :user2_id';
        values = values = { user1_id: couple1, user2_id: couple2 };
        [result] = await conn.execute(sql, values);

        if (!result[0]) {
          sql = 'insert into couple(user1_id, user2_id) values(:user1_id, :user2_id)';
          await conn.execute(sql, values);
        }
        return true;
      } else return false;
    };
  }

  return await transactionWrapper(conn, callback)(diary_id, user_id);
};
