import logger from 'logger';
import Database from '../db';

export const databaseConnector =
  (handler: Function) =>
  async (...params: any[]) => {
    let conn;
    try {
      conn = await Database.getConnection();
      return await handler(conn, ...params);
    } catch (error) {
      logger.error('데이터베이스 에러', error);
      return error;
    } finally {
      if (conn) conn.release();
    }
  };
