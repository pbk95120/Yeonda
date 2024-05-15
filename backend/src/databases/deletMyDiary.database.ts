import { Connection } from 'mysql2/promise';
import { getUserIdByEmail } from '@utils/getUserIdByEmail';
import { transactionWrapper } from '@src/middlewares/transactionWrapper.middleware';

export const deleteMyDiary = async (conn: Connection, diary_id: number) => {
  const callback = async (diary_id: number) => {
    const deleteLikes = `DELETE FROM diary WHERE id = :diary_id`;
    await conn.execute(deleteLikes, { diary_id: diary_id });
  };

  await transactionWrapper(conn, callback)(diary_id);
};
