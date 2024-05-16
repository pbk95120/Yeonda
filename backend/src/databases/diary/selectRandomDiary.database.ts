import { PreferIdRequest, UsualRandomDiary } from '@schemas/diary.schema';
import CustomError from '@src/error';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';

export const selectRandomDiary = async (conn: Connection, body: PreferIdRequest): Promise<UsualRandomDiary> => {
  const { user_id, prefer_id } = body;

  let sql = `
  select d.*, json_arrayagg(dt.tag_id) as tags from diary d
  join diary_tag dt on dt.diary_id = d.id
  left join likes l on l.diary_id = d.id and l.user_id = :user_id
  where d.user_id = :prefer_id and l.user_id is null
  group by d.id
  order by rand()
  limit 1;
  `;
  let values: {} = { user_id: user_id, prefer_id: prefer_id };
  let [result] = await conn.execute(sql, values);
  if (!result[0]) throw new CustomError(http.NOT_FOUND, '선호할만한 유저이나 작성한 일기가 없거나 이미 좋아요 함');
  let response = result[0];

  return response as UsualRandomDiary;
};
