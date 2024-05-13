import { MyPreference } from '@schemas/myProfile.schema';
import { getUserIdByEmail } from '@utils/getUserIdByEmail';
import { Connection } from 'mysql2/promise';

export const selectMyPreference = async (conn: Connection, email: string): Promise<MyPreference> => {
  const user_id = await getUserIdByEmail(conn, email);

  let sql = 'select * from preference where user_id = :user_id';
  let values = { user_id: user_id };
  let [result] = await conn.execute(sql, values);
  return new MyPreference(result[0]);
};
