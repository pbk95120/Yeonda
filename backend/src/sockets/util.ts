import { RowDataPacket } from 'mysql2';
import { Connection } from 'mysql2/promise';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import Database from '@src/db';
import { Socket } from 'socket.io';
import { errorHandler } from '@sockets/middleware';
import http from 'http-status-codes';

const { JWT_SECRET } = process.env;

export const emailFromToken = async (socket: Socket, token: string): Promise<string> => {
  try {
    const decoded = (await jwt.verify(token, JWT_SECRET as string)) as {
      email: string;
    };
    return decoded.email;
  } catch (err) {
    errorHandler(socket, http.BAD_REQUEST, '토큰 값이 유효하지 않습니다.', err);
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
