import 'dotenv/config';
import { Connection } from 'mysql2/promise';
import { RowDataPacket } from 'mysql2';
import { emailFromToken } from '@sockets/util';
import jwt from 'jsonwebtoken';
import http from 'http-status-codes';
import CustomError from '@src/error';

const { JWT_SECRET } = process.env;

export const Authentication = async (conn: Connection, token: string, coupleId: number, socketId: string) => {
  const email = await emailFromToken(token);
  const sql = `SELECT id FROM user WHERE email = :user_email`;
  const values = { user_email: email };
  const [result] = await conn.execute<RowDataPacket[]>(sql, values);
  if (!result) throw new CustomError(http.UNAUTHORIZED, '존재하지 않습니다.');
  const user_id = result[0].id;

  const slq_auth = 'SELECT * FROM couple WHERE id = :id AND :user_id IN (user1_id, user2_id)';
  const values_auth = { id: coupleId, user_id: user_id };
  const [result_auth] = await conn.execute<RowDataPacket[]>(sql, values);
  if (!result_auth) throw new CustomError(http.UNAUTHORIZED, '잘못된 접근입니다.');
};

export const Authorization = async (conn: Connection, user_id: number, couple_id: number, socketId: string) => {
  const sql = `SELECT * FROM couple WHERE id = :id AND ((user1_id = :user1_id AND user1_state = :user1_state) OR (user2_id = :user2_id AND user2_state = :user2_state))`;
  const values = { id: couple_id, user1_id: user_id, user1_state: socketId, user2_id: user_id, user2_state: socketId };
  const [result] = await conn.execute<RowDataPacket[]>(sql, values);
  if (!result) throw new CustomError(http.UNAUTHORIZED, '권한이 없습니다.');
};
