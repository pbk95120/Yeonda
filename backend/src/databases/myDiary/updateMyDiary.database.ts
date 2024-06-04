import { transactionWrapper } from '@middlewares/transactionWrapper.middleware';
import { UpdateDiary } from '@schemas/myDiary.shema';
import CustomError from '@src/error';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';

export const updateMyDiary = async (conn: Connection, body: UpdateDiary): Promise<void> => {
  let sql = 'select id from diary where id = :id and user_id = :user_id';
  let values: {} = { id: body.id, user_id: body.user_id };
  const [result] = await conn.execute(sql, values);
  if (!result[0]) throw new CustomError(http.NOT_FOUND, '수정 대상 일기를 찾을 수 없음');

  const callback = async (body: UpdateDiary) => {
    const { user_id, id, title, content, tags } = body;

    sql = `
    update diary
    set title = :title, content = :content, updated_at = now()
    where id = :id and user_id = :user_id
    `;
    values = { title: title, content: content, id: id, user_id: user_id };
    await conn.execute(sql, values);

    sql = 'delete from diary_tag where diary_id = :id';
    values = { id: id };
    await conn.execute(sql, values);

    if (tags) {
      for (const tag_id of tags) {
        sql = 'insert into diary_tag values (:id, :tag_id)';
        values = { id: id, tag_id: tag_id };
        await conn.execute(sql, values);
      }
    }
  };

  await transactionWrapper(conn, callback)(body);
};
