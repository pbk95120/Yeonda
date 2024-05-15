import { PopularDiaries } from '@schemas/diary.schema';
import { Connection } from 'mysql2/promise';

export const selectPopularDiaries = async (conn: Connection): Promise<PopularDiaries[]> => {
  let sql = `
  select d.*, json_arrayagg(dt.tag_id) as tags from diary d
  left join diary_tag dt on d.id = dt.diary_id
  where d.created_at >= now() - interval 2 week
  group by d.id
  order by likes desc
  limit 5;
  `;
  const [result] = await conn.execute(sql);
  return result as PopularDiaries[];
};
