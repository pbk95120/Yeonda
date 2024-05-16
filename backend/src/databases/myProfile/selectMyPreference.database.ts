import { MyPreference } from '@schemas/myProfile.schema';
import { Connection } from 'mysql2/promise';

export const selectMyPreference = async (conn: Connection, user_id: number): Promise<MyPreference> => {
  let sql = 'select * from preference where user_id = :user_id';
  let values = { user_id: user_id };
  let [result] = await conn.execute(sql, values);
  return new MyPreference(result[0]);
};
