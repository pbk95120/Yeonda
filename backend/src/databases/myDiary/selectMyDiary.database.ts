import CustomError from '@src/error';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';

export const selectMyDiary = async (conn: Connection, my_id: number) => {
  const sql = `SELECT d.id, u.nickname, u.picture_url, d.title, LEFT(d.content, 100) AS content, d.created_at, d.likes, JSON_ARRAYAGG(dt.tag_id) AS tags
      FROM
          user u
      JOIN
          diary d ON u.id = d.user_id
      LEFT JOIN
          diary_tag dt ON d.id = dt.diary_id
      WHERE
          u.id = :my_id
      GROUP BY
          d.id
      ORDER BY
          d.created_at DESC
  `;

  const values: {} = { my_id: my_id };
  const [result] = await conn.execute(sql, values);
  return result;
};
