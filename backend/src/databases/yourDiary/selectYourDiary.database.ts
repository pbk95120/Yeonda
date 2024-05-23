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
        d.id, u.nickname, u.picture_url, d.title, d.content, d.created_at, d.likes, 
        json_arrayagg(
            case
              when t.id is not null
              then json_object('id', t.id, 'name', t.name)
              else null
            end
          ) as tags 
    FROM
        user u
    JOIN
        diary d ON u.id = d.user_id
    LEFT JOIN
        diary_tag dt ON d.id = dt.diary_id
    LEFT JOIN
        tag t ON dt.tag_id = t.id
    WHERE
        u.id = :your_id
    GROUP BY
        d.id, u.nickname, u.picture_url, d.title, d.content, d.created_at, d.likes
    ORDER BY
        d.created_at DESC
    LIMIT 
        :limit OFFSET :offset
    `;

  const values = { your_id: your_id, limit: limit, offset: offset };
  const [result] = await conn.query(sql, values);

  return result as yourDiaryResults[];
};
