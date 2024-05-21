import { UsualRandomDiary } from '@schemas/diary.schema';
import CustomError from '@src/error';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';

export const selectTotallyRandomDiary = async (conn: Connection, user_id: number): Promise<UsualRandomDiary> => {
  let sql = `
  select d.*, 
  json_arrayagg(
    case
      when t.id is not null
      then json_object('id', t.id, 'name', t.name)
    else null
    end
  ) as tags
  from diary d
  left join diary_tag dt on dt.diary_id = d.id
  left join tag t on t.id = dt.tag_id
  left join likes l on l.diary_id = d.id and l.user_id = :user_id
  where l.user_id is null
  group by d.id
  order by rand()
  limit 1;
  `;
  let values: {} = { user_id: user_id };
  let [result] = await conn.execute(sql, values);
  if (!result[0]) throw new CustomError(http.NOT_FOUND, '랜덤으로 보여줄 일기 없음');

  return result[0] as UsualRandomDiary;
};
