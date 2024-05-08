import { RowDataPacket } from 'mysql2';
import { Connection } from 'mysql2/promise';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import CustomError from '@src/error';
import http from 'http-status-codes';
import Database from '@src/db';

const { JWT_SECRET } = process.env;

export const emailFromToken = async (token: string): Promise<string> => {
  try {
    const decoded = (await jwt.verify(token, JWT_SECRET as string)) as {
      email: string;
    };
    return decoded.email;
  } catch (err) {
    throw new CustomError(http.UNAUTHORIZED, '이부분 TODO:');
  }
};

export const getUserIdByEmail = async (conn: Connection, email: string) => {
  const sql = 'select id from user where email =:email';
  const values = { email: email };
  const [result] = await conn.execute<RowDataPacket[]>(sql, values);
  return result;
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
