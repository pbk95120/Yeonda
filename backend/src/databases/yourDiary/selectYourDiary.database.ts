import { Connection } from 'mysql2/promise';
import { yourDiaryResults } from '@schemas/yourDiary.schema';

export const selectYourDiary = async (
  conn: Connection,
  your_id: number,
  currentPage: number,
  limit: number,
): Promise<yourDiaryResults[]> => {
  const offset = (currentPage - 1) * limit;
  const sql = `SELECT 
        d.id, u.nickname, u.picture_url, d.title, d.content, d.created_at, d.likes, JSON_ARRAYAGG(dt.tag_id) AS tags
    FROM
        user u
    JOIN
        diary d ON u.id = d.user_id
    LEFT JOIN
        diary_tag dt ON d.id = dt.diary_id
    WHERE
        u.id = :your_id
    GROUP BY
        d.id
    ORDER BY
        d.created_at DESC
    LIMIT 
        :limit OFFSET :offset
    `;

  const values = { your_id: your_id, limit: limit, offset: offset };
  const [result] = await conn.execute(sql, values);
  return result as yourDiaryResults[];
};
