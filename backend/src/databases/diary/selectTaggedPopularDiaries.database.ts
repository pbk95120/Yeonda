import { PopularDiaries } from '@schemas/diary.schema';
import CustomError from '@src/error';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';

export const selectTaggedPopularDiaries = async (conn: Connection, tag_id: number): Promise<PopularDiaries[]> => {
  let sql = `
  select d.*, json_arrayagg(json_object('id', t.id, 'name', t.name)) as tags
  from diary d
  join diary_tag dt on d.id = dt.diary_id
  join tag t on t.id = dt.tag_id
  where d.id in (
    select d2.id
    from diary d2
    join diary_tag dt2 on d2.id = dt2.diary_id
    where d2.created_at >= now() - interval 2 week and dt2.tag_id = :tag_id
  )
  group by d.id
  order by likes desc
  limit 5;
  `;
  let values = { tag_id: tag_id };
  const [result] = await conn.execute(sql, values);
  if (!result[0]) throw new CustomError(http.NOT_FOUND, '조건에 맞는 인기 일기 없음');

  return result as PopularDiaries[];
};
