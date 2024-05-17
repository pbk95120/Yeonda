import { Connection } from 'mysql2/promise';

export const selectMyDiaryDetail = async (conn: Connection, user_id: number, diary_id: number) => {
  const sql = `SELECT d.id, u.nickname, u.picture_url, d.title, d.content, d.created_at, d.likes, JSON_ARRAYAGG(dt.tag_id) AS tags
      FROM
          user u
      JOIN
          diary d ON u.id = d.user_id
      LEFT JOIN
          diary_tag dt ON d.id = dt.diary_id
      WHERE
          u.id = :user_id AND d.id = :diary_id
      GROUP BY
          d.id
      ORDER BY
          d.created_at DESC
  `;

  const values: {} = { user_id: user_id, diary_id: diary_id };
  const [result] = await conn.execute(sql, values);

  return result;
};
