import { Connection } from 'mysql2/promise';
import { transactionWrapper } from '@src/middlewares/transactionWrapper.middleware';
import { partnerSchema } from '@schemas/chat.schema';
import CustomError from '@src/error';
import http from 'http-status-codes';

const selectPartnerDiaryLikes = async (conn: Connection, partner_id: number, my_id: number) => {
  const sql = `SELECT l.id
    FROM diary d
    INNER JOIN likes l ON d.id = l.diary_id
    WHERE d.user_id = :partner_id AND l.user_id = :my_id
    `;
  const values = { partner_id: partner_id, my_id: my_id };
  const [result] = await conn.execute(sql, values);
  return result;
};

const createExcouple = async (conn: Connection, partner: any, user1_id: number, user2_id: number): Promise<void> => {
  const callback = async (partner: any, user1_id: number, user2_id: number): Promise<void> => {
    let sql;

    sql = `DELETE FROM chat WHERE user_id = :user1_id OR user_id = :user2_id`;
    await conn.execute(sql, { user1_id: user1_id, user2_id: user2_id });

    sql = `INSERT INTO ex_couple (user1_id, user2_id) VALUES (:user1_id, :user2_id)`;
    await conn.execute(sql, { user1_id: user1_id, user2_id: user2_id });

    sql = `DELETE FROM couple WHERE user1_id = :user1_id AND user2_id = :user2_id`;
    await conn.execute(sql, { user1_id: user1_id, user2_id: user2_id });

    const idArray = partner.map((obj) => obj.id);
    sql = `DELETE FROM likes WHERE id IN (${idArray.join(', ')})`;
    await conn.execute(sql);
  };

  await transactionWrapper(conn, callback)(partner, user1_id, user2_id);
};

export const dislikedCouple = async (conn: Connection, partner_id: number, my_id: number): Promise<void> => {
  const partner = await selectPartnerDiaryLikes(conn, partner_id, my_id);
  const { error } = partnerSchema.validate(partner[0]);
  if (error) throw new CustomError(http.NOT_FOUND, '파트너 정보를 찾을 수 없습니다.', error);

  const [user1_id, user2_id] = my_id < partner_id ? [my_id, partner_id] : [partner_id, my_id];
  await createExcouple(conn, partner, user1_id, user2_id);
};
