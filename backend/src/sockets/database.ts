import { Connection } from 'mysql2/promise';
import { Socket } from 'socket.io';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export const getPartnerInfo = async (conn: Connection, socket: Socket, user_id: string, partner_id: string) => {
  const sql = `SELECT id as partner_id, nickname, picture_url FROM users WHERE id = :id`;
  const values = { id: parseInt(partner_id) };
  const [result] = await conn.execute<RowDataPacket[]>(sql, values);
  if (result.length === 0) socket.emit('error', { message: '파트너 정보를 찾지 못했습니다.' });
  result[0]['user_id'] = parseInt(user_id);
  return result[0];
};

export const getRecordChat = async (conn: Connection, couple_id: number) => {
  const sql = `SELECT user_id, message, picture_url, create_at as send_at, is_read FROM chat WHERE couple_id = :couple_id`;
  const values = { couple_id: couple_id };
  const [result] = await conn.execute<RowDataPacket[]>(sql, values);
  return result;
};

export const createChat = async (
  conn: Connection,
  socket: Socket,
  couple_id: string,
  message: string,
  url: string | null,
  is_read: number,
) => {
  const sql = `insert into chat (couple_id, user_id, picture_url, message, is_read)  values(:couple_id, :user_id, :picture_url, :message, :is_read)`;
  const values = {
    couple_id: couple_id,
    user_id: parseInt(socket.data.user_id),
    picture_url: url,
    message: message,
    is_read: is_read,
  };
  const insertionResult = await conn.execute<ResultSetHeader>(sql, values);
  const insertedRowId = insertionResult[0].insertId;
  const selectQuery = `SELECT user_id, message, picture_url, create_at as send_at, is_read FROM chat WHERE id = :insertedRowId`;
  const selectValues = { insertedRowId };
  const insertedRow = await conn.execute<RowDataPacket[]>(selectQuery, selectValues);
  return insertedRow[0][0];
};
