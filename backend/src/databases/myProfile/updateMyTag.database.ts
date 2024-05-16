import { transactionWrapper } from '@middlewares/transactionWrapper.middleware';
import CustomError from '@src/error';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';

export const updateMyTag = async (conn: Connection, user_id: number, tags: string): Promise<void> => {
  const tagArray: number[] = tags.split(',').map((e) => parseInt(e));

  const callback = async (user_id: number, tagArray: number[]) => {
    let sql = 'delete from user_tag where user_id = :user_id';
    let values: {} = { user_id: user_id };
    await conn.execute(sql, values);

    for (const tag_id of tagArray) {
      sql = 'select id from tag where id = :tag_id';
      values = { tag_id: tag_id };
      const [result] = await conn.execute(sql, values);
      if (!result[0]) throw new CustomError(http.BAD_REQUEST, '존재하지 않는 태그');

      sql = 'insert into user_tag values(:user_id, :tag_id)';
      values = { user_id: user_id, tag_id: tag_id };
      await conn.execute(sql, values);
    }
  };

  await transactionWrapper(conn, callback)(user_id, tagArray);
};
