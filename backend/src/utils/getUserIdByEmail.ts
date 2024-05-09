import { RowDataPacket } from 'mysql2';
import { Connection } from 'mysql2/promise';

export const getUserIdByEmail = async (conn: Connection, email: string): Promise<number> => {
  const sql = 'select id from users where email =:email';
  const values = { email: email };
  const [result] = await conn.execute<RowDataPacket[]>(sql, values);
  return result[0].id;
};
