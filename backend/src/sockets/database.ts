import { Connection } from 'mysql2/promise';
import { Socket } from 'socket.io';
import { RowDataPacket } from 'mysql2';
import CustomError from '@src/error';
import http from 'http-status-codes';

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
