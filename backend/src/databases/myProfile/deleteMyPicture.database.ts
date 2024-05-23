import { S3Delete } from '@middlewares/S3Delete.middleware';
import { transactionWrapper } from '@middlewares/transactionWrapper.middleware';
import { Logon } from '@schemas/login.schema';
import CustomError from '@src/error';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';

export const deleteMyPicture = async (conn: Connection, body: Logon): Promise<void> => {
  const { user_id } = body;
  let sql = 'select picture_url from user where id = :user_id';
  let values: {} = { user_id: user_id };
  const [result] = await conn.execute(sql, values);
  if (!result[0].picture_url) throw new CustomError(http.NOT_FOUND, '삭제할 프로필 사진 없음');

  const picture_url = result[0].picture_url;

  await S3Delete(picture_url);

  const callback = async () => {
    sql = 'update user set picture_url = null where id = :user_id';
    await conn.execute(sql, values);
  };

  await transactionWrapper(conn, callback)();
};
