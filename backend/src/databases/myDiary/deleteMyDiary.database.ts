import { transactionWrapper } from '@middlewares/transactionWrapper.middleware';
import { Connection } from 'mysql2/promise';

export const deleteMyDiary = async (conn: Connection, diary_id: number): Promise<void> => {
  const callback = async (diary_id: number) => {
    const deleteDiary = `DELETE FROM diary 
    WHERE 
      id = :diary_id
    `;
    await conn.execute(deleteDiary, { diary_id: diary_id });
  };

  await transactionWrapper(conn, callback)(diary_id);
};
