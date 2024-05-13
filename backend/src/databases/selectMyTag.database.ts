import { TagName } from '@models/tag.model';
import { Connection } from 'mysql2/promise';

export const selectMyTag = async (conn: Connection, user_id: number): Promise<TagName[]> => {
  const sql = 'select t.id, t.name from tag t join user_tag ut on ut.tag_id = t.id where ut.user_id = :user_id';
  const values: {} = { user_id: user_id };
  const [result] = await conn.execute(sql, values);
  return result as TagName[];
};
