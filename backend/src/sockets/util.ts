import { RowDataPacket } from 'mysql2';
import { Connection } from 'mysql2/promise';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import Database from '@src/db';
import { Socket } from 'socket.io';

const { JWT_SECRET } = process.env;

export const emailFromToken = async (socket: Socket, token: string): Promise<string> => {
  try {
    const decoded = (await jwt.verify(token, JWT_SECRET as string)) as {
      email: string;
    };
    return decoded.email;
  } catch (err) {
    socket.emit('error', { message: '토큰 값이 유효하지 않습니다.' });
    socket.disconnect();
  }
};

export const getUserIdByEmail = async (conn: Connection, socket: Socket, email: string) => {
  const sql = 'select id from users where email =:email';
  const values = { email: email };
  const [result] = await conn.execute<RowDataPacket[]>(sql, values);
  if (result.length == 0) {
    socket.emit('error', { message: '인증되지 않은 사용자 접근입니다.' });
    socket.disconnect();
  }
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
