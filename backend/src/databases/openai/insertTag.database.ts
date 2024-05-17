import { transactionWrapper } from '@middlewares/transactionWrapper.middleware';
import CustomError from '@src/error';
import { getEmbedding } from '@utils/getEmbedding';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';

export const insertTag = async (conn: Connection, tag: string): Promise<void> => {
  let sql = 'select id from tag where name = :name';
  let values: {} = { name: tag };
  const [result] = await conn.execute(sql, values);
  if (result[0]) throw new CustomError(http.CONFLICT, '이미 존재하는 태그입니다');

  const embedding = await getEmbedding(tag);

  const callback = async (tag: string, embedding: number[]) => {
    sql = 'insert into tag (name, vector) values (:name, :vector)';
    values = { name: tag, vector: JSON.stringify(embedding) };
    await conn.execute(sql, values);
  };

  await transactionWrapper(conn, callback)(tag, embedding);
};
