import { transactionWrapper } from '@middlewares/transactionWrapper';
import { getUserIdByEmail } from '@utils/getUserIdByEmail';
import { saveFile } from '@utils/saveFile';
import { Connection } from 'mysql2/promise';

export const updateMyPicture = async (
  conn: Connection,
  email: string,
  url: string,
  file: Express.Multer.File,
): Promise<void> => {
  const user_id = await getUserIdByEmail(conn, email);

  const callback = async (user_id: number, picture_url: string, file: Express.Multer.File) => {
    saveFile(picture_url, file.buffer);

    sql = 'update user set picture_url = :picture_url where id = :user_id';
    values = { user_id: user_id, picture_url: picture_url };
    await conn.execute(sql, values);
  };

  await transactionWrapper(conn, callback)(user_id, url, file);
};
