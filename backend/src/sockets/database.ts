import { Connection } from 'mysql2/promise';
import { Socket } from 'socket.io';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { errorHandler } from '@sockets/middleware';
import { transactionWrapper } from '@sockets/middleware';
import { io } from '@src/app';
import http from 'http-status-codes';

export const updateIsRead = async (conn: Connection, socket: Socket, partner_id: string, couple_id: string) => {
  try {
    const sql = `SELECT id FROM chat WHERE couple_id = :couple_id AND user_id = :user_id AND is_read = 0`;
    const values = { couple_id: couple_id, user_id: parseInt(partner_id) };
    const [result] = await conn.execute<RowDataPacket[]>(sql, values);
    if (result.length > 0) {
      const callback = async (couple_id: number, partner_id: number): Promise<void> => {
        const updateSql =
          'UPDATE chat SET is_read = 1 WHERE couple_id = :couple_id AND user_id = :user_id AND is_read = 0';
        const updateValues = { couple_id: couple_id, user_id: partner_id };
        await conn.execute<ResultSetHeader>(updateSql, updateValues);
      };
      await transactionWrapper(conn, callback)(parseInt(couple_id), parseInt(partner_id));
    }
  } catch (err) {
    errorHandler(socket, http.INTERNAL_SERVER_ERROR, err.message, err);
  }
};

export const getUserIdByEmail = async (conn: Connection, socket: Socket, email: string) => {
  try {
    const sql = `select id from users where email =:email`;
    const values = { email: email };
    const [result] = await conn.execute<RowDataPacket[]>(sql, values);
    if (result.length == 0) {
      errorHandler(socket, http.UNAUTHORIZED, '인증되지 않은 사용자 접근입니다.');
    }
    return result;
  } catch (err) {
    errorHandler(socket, http.UNAUTHORIZED, err.message, err);
  }
};

export const getPartnerInfo = async (conn: Connection, socket: Socket, user_id: string, partner_id: string) => {
  try {
    const sql = `SELECT id as partner_id, nickname, picture_url FROM users WHERE id = :id`;
    const values = { id: parseInt(partner_id) };
    const [result] = await conn.execute<RowDataPacket[]>(sql, values);
    if (result.length === 0) {
      errorHandler(socket, http.NOT_FOUND, '파트너 정보를 찾지 못했습니다.');
    }
    result[0]['user_id'] = parseInt(user_id);
    return result[0];
  } catch (err) {
    errorHandler(socket, http.INTERNAL_SERVER_ERROR, err.message, err);
  }
};

export const getRecordChat = async (conn: Connection, socket: Socket, couple_id: number) => {
  try {
    const sql = `SELECT user_id, message, picture_url, send_at, is_read FROM chat WHERE couple_id = :couple_id`;
    const values = { couple_id: couple_id };
    const [result] = await conn.execute<RowDataPacket[]>(sql, values);
    return result;
  } catch (err) {
    errorHandler(socket, http.INTERNAL_SERVER_ERROR, err.message, err);
  }
};

export const createChat = async (
  conn: Connection,
  socket: Socket,
  couple_id: string,
  message: string,
  url: string | null,
  is_read: number,
) => {
  try {
    const callback = async (
      couple_id: number,
      user_id: number,
      picture_url: string,
      message: string,
      is_read: number,
    ): Promise<void> => {
      const sql = `insert into chat (couple_id, user_id, picture_url, message, is_read)  values(:couple_id, :user_id, :picture_url, :message, :is_read)`;
      const values = {
        couple_id: couple_id,
        user_id: user_id,
        picture_url: picture_url,
        message: message,
        is_read: is_read,
      };
      await conn.execute<ResultSetHeader>(sql, values);
    };
    await transactionWrapper(conn, callback)(couple_id, parseInt(socket.data.user_id), url, message, is_read);
    const selectQuery = `SELECT user_id, message, picture_url, send_at, is_read FROM chat WHERE couple_id = :couple_id ORDER BY id DESC LIMIT 1`;
    const selectValues = { couple_id: couple_id };
    const [result] = await conn.execute<RowDataPacket[]>(selectQuery, selectValues);
    return result[0];
  } catch (err) {
    errorHandler(socket, http.INTERNAL_SERVER_ERROR, err.message, err);
  }
};
