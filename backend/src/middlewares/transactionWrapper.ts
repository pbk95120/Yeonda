import logger from 'logger';
import { Connection } from 'mysql2/promise';

export type TransactionType = void | number;

export const transactionWrapper = async (
  conn: Connection,
  callback: () => Promise<TransactionType>,
): Promise<TransactionType> => {
  try {
    await conn.beginTransaction();
    const response = await callback();
    await conn.commit();
    return response;
  } catch (error) {
    await conn.rollback();
    logger.error('트랜잭션 단계 에러', error);
    throw error;
  }
};
