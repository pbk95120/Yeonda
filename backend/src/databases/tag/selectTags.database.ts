import { TagName } from '@models/tag.model';
import { Connection } from 'mysql2/promise';

export const selectTags = async (conn: Connection): Promise<TagName[]> => {
  let sql = 'select id, name from tag';
  const [result] = await conn.execute(sql);
  return result as TagName[];
};
