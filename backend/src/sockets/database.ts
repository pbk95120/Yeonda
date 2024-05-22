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
  const sql = `SELECT id, user_id, message, picture_url, send_at
    FROM chat 
    WHERE couple_id = :couple_id`;
  const values = { couple_id: couple_id };

  const [result] = await conn.execute(sql, values);
  return result as RecordChat[];
};

const getShowDate = async (record: RecordChat[]) => {
  if (record.length === 0) return [];

  const records = record.map((currentRecord, index) => {
    const sendAtDate = new Date(currentRecord.send_at);
    let isDateChanged = false;

    if (index === 0) {
      isDateChanged = true;
    } else {
      const prevRecord = record[index - 1];
      const prevSendAtDate = new Date(prevRecord.send_at);
      isDateChanged = sendAtDate.toDateString() !== prevSendAtDate.toDateString();
    }

    return {
      ...currentRecord,
      show_date: isDateChanged,
    };
  });

  return records as RecordChat[];
};

const addInfoChat = async (conn: Connection, couple_id: number) => {
  const sql = `SELECT id, send_at FROM chat where couple_id = :couple_id ORDER BY id DESC LIMIT 2`;
  const values = { couple_id: couple_id };
  const [result] = await conn.execute(sql, values);

  if (!result[1]) {
    return { id: result[0].id, show_date: true };
  }

  const currentDate = new Date(result[0].send_at).toISOString().split('T')[0];
  const previousDate = new Date(result[1].send_at).toISOString().split('T')[0];

  const info = {
    id: result[0].id,
    show_date: currentDate !== previousDate,
  };

  return info;
};

export const selectChatInfo = async (conn: Connection, couple_id: number, partner_id: number): Promise<ChatInfo> => {
  const partnerInfo = await databaseConnector(getPartnerInfo)(partner_id);
  await databaseConnector(updateIsRead)(couple_id, partner_id);
  const recordChat = await databaseConnector(getRecordChat)(couple_id);
  const showDate = await getShowDate(recordChat);
  partnerInfo['chat'] = showDate;
  return partnerInfo as ChatInfo;
};

export const createChat = async (
  conn: Connection,
  couple_id: number,
  user_id: number,
  picture_url: string | null,
  message: string,
  send_at: string,
  is_read: number,
) => {
  const callback = async (couple_id, user_id, picture_url, message, send_at, is_read): Promise<void> => {
    const sql = `INSERT INTO chat (couple_id, user_id, picture_url, message, send_at, is_read)  VALUES (:couple_id, :user_id, :picture_url, :message, :send_at, :is_read)`;
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

  const chat_info = await addInfoChat(conn, couple_id);
  return chat_info;
};
