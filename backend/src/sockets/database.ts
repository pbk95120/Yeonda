import { Connection } from 'mysql2/promise';
import { transactionWrapper, databaseConnector } from '@sockets/middleware';
import { PartnerInfo, RecordChat, ChatInfo } from '@sockets/schemas';

const getPartnerInfo = async (conn: Connection, user_id: number): Promise<PartnerInfo> => {
  const sql = `SELECT id as partner_id, nickname, picture_url FROM user WHERE id = :id`;
  const values = { id: user_id };
  const [result] = await conn.execute(sql, values);

  result[0]['user_id'] = user_id;
  return result[0] as PartnerInfo;
};

const updateIsRead = async (conn: Connection, couple_id: number, user_id: number): Promise<void> => {
  const sql = `SELECT id FROM chat WHERE couple_id = :couple_id AND user_id = :user_id AND is_read = 1`;
  const values = { couple_id: couple_id, user_id: user_id };
  const [result] = await conn.execute(sql, values);
  if (!result) {
    return;
  }
  const callback = async (couple_id: number, user_id: number): Promise<void> => {
    const updateSql = `UPDATE chat SET is_read = 0
      WHERE couple_id = :couple_id AND user_id = :user_id AND is_read = 1`;
    const updateValues = { couple_id: couple_id, user_id: user_id };
    await conn.execute(updateSql, updateValues);
  };
  await transactionWrapper(conn, callback)(couple_id, user_id);
};

const getRecordChat = async (conn: Connection, couple_id: number): Promise<RecordChat[]> => {
  const sql = `SELECT user_id, message, picture_url, send_at, is_read 
    FROM chat 
    WHERE couple_id = :couple_id`;
  const values = { couple_id: couple_id };

  const [result] = await conn.execute(sql, values);
  return result as RecordChat[];
};

export const selectChatInfo = async (conn: Connection, couple_id: number, partner_id: number): Promise<ChatInfo> => {
  const partnerInfo = await databaseConnector(getPartnerInfo)(partner_id);
  await databaseConnector(updateIsRead)(couple_id, partner_id);
  const recordChat = await databaseConnector(getRecordChat)(couple_id);
  partnerInfo['chat'] = recordChat;
  return partnerInfo as ChatInfo;
};

export const createChat = async (
  conn: Connection,
  couple_id: number,
  user_id: number,
  picture_url: string,
  message: string,
  send_at: string,
  is_read: number,
): Promise<void> => {
  const callback = async (couple_id, user_id, picture_url, message, send_at, is_read): Promise<void> => {
    const sql = `INSERT INTO chat (couple_id, user_id, picture_url, message, send_at, is_read)  VALUES(:couple_id, :user_id, :picture_url, :message, :send_at, :is_read)`;
    const values = {
      couple_id: couple_id,
      user_id: user_id,
      picture_url: picture_url,
      message: message,
      send_at: send_at,
      is_read: is_read,
    };
    await conn.execute(sql, values);
  };

  await transactionWrapper(conn, callback)(couple_id, user_id, picture_url, message, send_at, is_read);
};
