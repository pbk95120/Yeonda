import { requestS3Save } from '@middlewares/requestS3Save.middleware';
import { transactionWrapper } from '@middlewares/transactionWrapper.middleware';
import { Connection } from 'mysql2/promise';

export const updateMyPicture = async (
  conn: Connection,
  user_id: number,
  url: string,
  file: Express.Multer.File,
): Promise<void> => {
  const callback = async (user_id: number, file: Express.Multer.File) => {
    const picture_url = await requestS3Save(file);

    const sql = 'update user set picture_url = :picture_url where id = :user_id';
    const values = { user_id: user_id, picture_url: picture_url };
    await conn.execute(sql, values);
  };

  await transactionWrapper(conn, callback)(user_id, url, file);
};
