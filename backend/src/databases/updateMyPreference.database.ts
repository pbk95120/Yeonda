import { transactionWrapper } from '@middlewares/transactionWrapper';
import { PatchMyPreference } from '@schemas/myProfile.schema';
import { getUserIdByEmail } from '@utils/getUserIdByEmail';
import { Connection } from 'mysql2/promise';

export const updateMyPreference = async (conn: Connection, preference: PatchMyPreference): Promise<void> => {
  const user_id = await getUserIdByEmail(conn, preference.email);

  const callback = async (user_id: number, p: PatchMyPreference) => {
    const sql = `update preference set gender = :gender, distance = :distance, start_age = :start_age, end_age = :end_age
    where user_id = :user_id`;
    const values = {
      gender: p.gender,
      distance: p.distance,
      start_age: p.start_age,
      end_age: p.end_age,
      user_id: user_id,
    };
    await conn.execute(sql, values);
  };

  await transactionWrapper(conn, callback)(user_id, preference);
};
