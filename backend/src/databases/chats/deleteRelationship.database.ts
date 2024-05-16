import { Connection } from 'mysql2/promise';
import { getUserIdByEmail } from '@utils/getUserIdByEmail';

// 상대방 유저 일기 좋아요 삭제 - 채팅방 저장
export const archiveCouple = async (conn: Connection, email: string, opponent_id: number) => {
  const user_id = await getUserIdByEmail(conn, email);
  const [user1_id, user2_id] = opponent_id > user_id ? [user_id, opponent_id] : [opponent_id, user_id];

  const deleteLikes = `DELETE FROM likes WHERE user_id = :user_id`;
  const moveCoupleToExCouple = `
  INSERT INTO ex_couple (user1_id, user2_id)
  SELECT user1_id, user2_id
  FROM couple
  WHERE user1_id = :user1_id AND user2_id = :user2_id`;
  const deleteCouple = `
  DELETE FROM couple
  WHERE user1_id = :user1_id AND user2_id = :user2_id`;

  await conn.execute(deleteLikes, { user_id: user_id });
  await conn.execute(moveCoupleToExCouple, { user1_id: user1_id, user2_id: user2_id });
  await conn.execute(deleteCouple, { user1_id: user1_id, user2_id: user2_id });

  return;
};
