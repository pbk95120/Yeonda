import { UsualRandomDiary } from '@schemas/diary.schema';
import CustomError from '@src/error';
import http from 'http-status-codes';
import { Connection, RowDataPacket } from 'mysql2/promise';

export const selectRandomDiary = async (conn: Connection, prefer_id: number): Promise<UsualRandomDiary> => {
  let sql = `
  select d.* from diary d
  left join likes l on l.diary_id = d.id
  where d.user_id = :prefer_id and l.user_id is null
  order by rand()
  limit 1;
  `;
  let values: {} = { prefer_id: prefer_id };
  let [result] = await conn.execute(sql, values);
  if (!result[0]) throw new CustomError(http.NOT_FOUND, '선호할만한 유저이나 작성한 일기 없음');
  let response = result[0];

  const diary_id = result[0].id;
  sql = 'select tag_id from diary_tag where diary_id = :diary_id';
  values = { diary_id: diary_id };
  [result] = await conn.execute<RowDataPacket[]>(sql, values);
  const tags = result.map((e) => e.tag_id);
  response.tags = tags;

  return response as UsualRandomDiary;
};
