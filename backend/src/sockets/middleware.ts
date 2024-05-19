import { Connection } from 'mysql2/promise';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import Database from '@src/db';
import logger from '@src/logger';
import 'dotenv/config';

export const transactionWrapper =
  (conn: Connection, callback: (...params: any[]) => Promise<any>) =>
  async (...params: any[]): Promise<any> => {
    try {
      await conn.beginTransaction();
      const response = await callback(...params);
      await conn.commit();
      return response;
    } catch (error) {
      await conn.rollback();
      logger.error(error);
    }
  };

export const databaseConnector =
  (handler: Function) =>
  async (...params: any[]) => {
    let conn;
    try {
      conn = await Database.getConnection();
      return await handler(conn, ...params);
    } catch (error) {
      throw error;
    } finally {
      if (conn) conn.release();
    }
  };

export const S3_SaveController = async (file) => {
  const client = new S3Client({
    region: process.env.REGION,
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
  });

  const buffer = Buffer.from(file.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  const uniqueName = uuidv4();
  const extension = file.name.split('.').pop();
  const S3_img = `${uniqueName}.${extension}`;
  const DB_picture_url = `${process.env.q}${S3_img}`;

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: S3_img,
    Body: buffer,
  };

  try {
    await client.send(new PutObjectCommand(params));
    logger.info(`${params.Key} Upload Success`);
  } catch (error) {
    logger.error(error);
    return error;
  }

  return DB_picture_url;
};
