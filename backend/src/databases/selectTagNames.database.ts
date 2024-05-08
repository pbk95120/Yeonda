import { TagName } from '@models/tag.model';
import { SignupInfo } from '@schemas/signup.schema';
import { Connection } from 'mysql2/promise';

export const selectTagNames = async (conn: Connection, info: SignupInfo): Promise<void> => {
  const sql = 'select id, name from tag';
  const [result] = await conn.execute(sql);
  info.tags = result as TagName[];
};
