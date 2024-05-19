import { Connection } from 'mysql2/promise';
import { partner, partnerChatlist } from '@schemas/chat.schema';

const selectPartner = async (conn: Connection, id: number): Promise<partner[]> => {
  const user_id = id;
  const sql = `SELECT id, user2_id as user_id
    FROM couple
    WHERE user1_id = :user1_id
    
    UNION
    
    SELECT id, user1_id as user_id
    FROM couple
    WHERE user2_id = :user2_id
    `;
  const values = { user1_id: user_id, user2_id: user_id };
  const [result] = await conn.execute(sql, values);

  return result as partner[];
};

const selectPartnerChatInfo = async (conn: Connection, partner: any, user_id: number, email: string) => {
  const info = await Promise.all(
    partner.map(async (value) => {
      const couple_id = parseInt(value.id);
      const partner_id = parseInt(value.user_id);

      const partner_sql = `
            SELECT nickname, picture_url
            FROM user
            WHERE id = :partner_id
            `;
      const partner_values = { partner_id: partner_id };
      const [partnerInfo] = await conn.execute(partner_sql, partner_values);

      const chat_sql = `
            SELECT message, is_read, TIMESTAMPDIFF(DAY, send_at, NOW()) AS commu_streak
            FROM chat
            WHERE couple_id = :couple_id
            ORDER BY send_at DESC
            LIMIT 1
            `;
      const chat_values = { couple_id: couple_id };
      const [chat_info] = await conn.execute(chat_sql, chat_values);

      return {
        couple_id: couple_id,
        user1_id: user_id,
        user2_id: partner_id,
        email: email,
        picture_url: partnerInfo[0].picture_url,
        nickname: partnerInfo[0].nickname,
        message: chat_info[0].message,
        is_read: chat_info[0].is_read,
        commu_streak: chat_info[0].commu_streak,
      };
    }),
  );

  return info;
};

export const selectChatlist = async (conn: Connection, user_id: number, email: string): Promise<partnerChatlist[]> => {
  const partner = await selectPartner(conn, user_id);
  const partnerChatlist = await selectPartnerChatInfo(conn, partner, user_id, email);
  return partnerChatlist as partnerChatlist[];
};
