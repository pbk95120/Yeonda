import { Connection } from 'mysql2/promise';
import { yourDiaryResults } from '@schemas/yourDiary.schema';

export const selectYourDiaryDetail = async (
  conn: Connection,
  diary_id: number,
  your_id: number,
): Promise<yourDiaryResults[]> => {
  const sql = `SELECT 
        d.id, u.nickname, u.picture_url, d.title, d.content, d.created_at, d.likes, 
        COALESCE(JSON_ARRAYAGG(JSON_OBJECT('id', t.id, 'name', t.name)), JSON_ARRAY()) as tags
    FROM
        user u
    JOIN
        diary d ON u.id = d.user_id
    LEFT JOIN
        diary_tag dt ON d.id = dt.diary_id
    LEFT JOIN
        tag t ON dt.tag_id = t.id
    WHERE
        u.id = :your_id AND d.id = :diary_id
    GROUP BY
        d.id, u.nickname, u.picture_url, d.title, d.content, d.created_at, d.likes
    `;

  const values = { your_id: your_id, diary_id: diary_id };
  const [result] = await conn.query(sql, values);

  return result as yourDiaryResults[];
};
