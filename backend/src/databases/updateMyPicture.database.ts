import { transactionWrapper } from '@middlewares/transactionWrapper';
import CustomError from '@src/error';
import { saveFile } from '@utils/saveFile';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';

export const updateMyPicture = async (
  conn: Connection,
  email: string,
  url: string,
  file: Express.Multer.File,
): Promise<void> => {
  let sql = 'select id from user where email = :email';
  let values: {} = { email: email };
  const [result] = await conn.execute(sql, values);
  if (!result[0]) throw new CustomError(http.NOT_FOUND, '존재하지 않는 사용자');
  const user_id = result[0].id;

  const callback = async (user_id: number, picture_url: string, file: Express.Multer.File) => {
    saveFile(picture_url, file.buffer);

    sql = 'update user set picture_url = :picture_url where id = :user_id';
    values = { user_id: user_id, picture_url: picture_url };
    await conn.execute(sql, values);
  };

  await transactionWrapper(conn, callback)(user_id, url, file);
};
