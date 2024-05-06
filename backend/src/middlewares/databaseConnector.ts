import Database from '../db';
import logger from '../logger';

export const databaseConnector =
  (handler: Function) =>
  async (...params: any[]) => {
    let conn;
    try {
      conn = await Database.getConnection();
      return await handler(conn, ...params);
    } catch (error) {
      logger.error('데이터 베이스 에러', error);
      throw error;
    } finally {
      if (conn) conn.release();
    }
  };
