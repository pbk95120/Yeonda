import { Connection } from 'mysql2/promise';
import { Socket } from 'socket.io';
import { RowDataPacket } from 'mysql2';
import CustomError from '@src/error';
import http from 'http-status-codes';
import { createChatSchema } from './schemas';

export const updateCouple = async (conn: Connection, socket: Socket, coupleId: string, user_id: number) => {
  const sql = `SELECT
    user1_id, user2_id
    FROM couple
    WHERE id = :id AND :user_id IN (user1_id, user2_id)`;
  const values = { id: coupleId, user_id: user_id };
  const [result] = await conn.execute<RowDataPacket[]>(sql, values);
  if (result.length > 0) {
    const user1Id = result[0].user1_id;
    const user2Id = result[0].user2_id;
    if (user1Id === user_id) {
      const sql_update = `UPDATE couple SET user1_state = :socket_id WHERE id = :id`;
      const values_update = { socket_id: socket.id, id: coupleId };
      await conn.execute(sql_update, values_update);
      return user1Id;
    } else if (user2Id === user_id) {
      const sql_update = `UPDATE couple SET user2_state = :socket_id WHERE id = :id`;
      const values_update = { socket_id: socket.id, id: coupleId };
      await conn.execute(sql_update, values_update);
      return user2Id;
    }
  }
};

export const getPartnerInfo = async (conn: Connection, user_id: number, partner_id: number) => {
  const sql = `SELECT id as partner_id, nickname, picture_url FROM users WHERE id = :id`;
  const values = { id: partner_id };
  const [result] = await conn.execute<RowDataPacket[]>(sql, values);
  if (result.length === 0) throw new CustomError(http.NOT_FOUND, '파트너 정보를 찾지 못했습니다.');
  result[0]['user_id'] = user_id;
  return result[0];
};

export const getRecordChat = async (conn: Connection, couple_id: string) => {
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
  url: string,
  is_read: number,
) => {
  const sql_user = `SELECT 
    CASE 
      WHEN user1_state = :user_state THEN user1_id 
      ELSE user2_id 
    END AS user_id
  FROM 
    couple
  WHERE 
    id = :id AND (user1_state = :user1_state OR user2_state = :user2_state);
  `;
  const values_user = { user_state: socket.id, id: couple_id, user1_state: socket.id, user2_state: socket.id };
  const [result_user] = await conn.execute<RowDataPacket[]>(sql_user, values_user);
  const user_id = result_user[0].user_id;
  const currentDate = new Date().toISOString().slice(0, 10);

  const sql = `insert into chat (couple_id, user_id, picture_url, message, is_read, create_at)  values(:couple_id, :user_id, :file, :message, :is_read, :currentDate)`;
  const values = {
    couple_id: couple_id,
    user_id: user_id,
    file: url,
    message: message,
    is_read: is_read,
    currentDate: currentDate,
  };

  // 데이터 유효성 검사
  // const { error } = createChatSchema.validate(values);
  // if (error) throw new CustomError(http.NOT_FOUND, '이부분 TODO:');

  const [result] = await conn.execute<RowDataPacket[]>(sql, values);
  // if (result.length === 0) throw new CustomError(http.NOT_FOUND, "TODO:");
  return { user_id: user_id, message: message, picture_url: url, send_at: currentDate, is_read: is_read };
};
