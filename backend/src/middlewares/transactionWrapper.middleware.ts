import { Connection } from 'mysql2/promise';

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
      throw error;
    }
  };
