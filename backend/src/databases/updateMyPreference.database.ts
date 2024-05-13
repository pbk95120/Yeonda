import { transactionWrapper } from '@middlewares/transactionWrapper.middleware';
import { PatchMyPreference } from '@schemas/myProfile.schema';
import { Connection } from 'mysql2/promise';

export const updateMyPreference = async (conn: Connection, preference: PatchMyPreference): Promise<void> => {
  const callback = async (p: PatchMyPreference) => {
    const sql = `update preference set gender = :gender, distance = :distance, start_age = :start_age, end_age = :end_age
    where user_id = :user_id`;
    const values = {
      gender: p.gender,
      distance: p.distance,
      start_age: p.start_age,
      end_age: p.end_age,
      user_id: p.user_id,
    };
    await conn.execute(sql, values);
  };

  await transactionWrapper(conn, callback)(preference);
};
