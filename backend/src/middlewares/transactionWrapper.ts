import { Connection } from 'mysql2/promise';

export const transactionWrapper = async (
  conn: Connection,
  callback: (...params: any[]) => Promise<void>,
  params: any[],
): Promise<void> => {
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
