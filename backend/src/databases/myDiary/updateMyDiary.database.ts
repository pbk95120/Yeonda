import { transactionWrapper } from '@middlewares/transactionWrapper.middleware';
import { Connection } from 'mysql2/promise';

export const updateMyDiary = async (
  conn: Connection,
  diary_id: number,
  title: string,
  content: string,
): Promise<void> => {
  const callback = async (diary_id: number, title: string, content: string) => {
    const sql = `UPDATE diary SET 
      title = :title, content = :content, updated_at =NOW() 
    WHERE 
      id = :diary_id
    `;
    const values = { title: title, content: content, diary_id: diary_id };
    await conn.execute(sql, values);
  };

  await transactionWrapper(conn, callback)(diary_id, title, content);
};
