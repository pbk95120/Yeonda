import { Connection } from 'mysql2/promise';
import { getUserIdByEmail } from '@utils/getUserIdByEmail';

// 상대방 유저id 찾기
export const selectOpponentId = async (conn: Connection, email: string) => {
  const user_id = await getUserIdByEmail(conn, email);
  const sql = `
    SELECT 
        id,
        CASE
            WHEN user1_id = :user_id THEN user2_id
            ELSE user1_id
        END AS opponent_id
    FROM couple
    WHERE user1_id = :user_id OR user2_id = :user_id
    `;
  const values = { user_id: user_id };

  const [result] = await conn.execute(sql, values);
  return result;
};

// 상대방 유저 정보 찾기
export const selectOpponentInfo = async (conn: Connection, opponent_id: number) => {
  const sql = `
      SELECT 
          id,
          nickname,
          picture_url
      FROM user
      WHERE id = :opponent_id
    `;
  const values = { opponent_id: opponent_id };
  const [result] = await conn.execute(sql, values);
  return result;
};

// 마지막 메시지 가져오기
export const selectChats = async (conn: Connection, coupleId: string) => {
  const sql = `
    SELECT 
        message,
        is_read,
        TIMESTAMPDIFF(DAY, send_at, NOW()) AS commu_streak
    FROM chat
    WHERE couple_id = :coupleId
    ORDER BY send_at DESC
    LIMIT 1
    `;
  const values = { coupleId: coupleId };
  const [result] = await conn.execute(sql, values);
  return result;
};
