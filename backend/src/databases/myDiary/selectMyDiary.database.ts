import { Connection } from 'mysql2/promise';
import { myDiaryResults } from '@schemas/myDiary.shema';

export const selectMyDiary = async (
  conn: Connection,
  my_id: number,
  currentPage: number,
  limit: number,
  sort: number,
): Promise<myDiaryResults[]> => {
  const sorted = sort === 1 ? 'd.likes DESC' : 'd.created_at DESC';
  const offset = (currentPage - 1) * limit;

  const sql = `SELECT d.id, u.nickname, u.picture_url, d.title, d.content, d.created_at, d.likes,
        json_arrayagg(json_object('id', t.id, 'name', t.name)) as tags
    FROM
        user u
    JOIN
        diary d ON u.id = d.user_id
    LEFT JOIN
        diary_tag dt ON d.id = dt.diary_id
    LEFT JOIN
        tag t ON dt.tag_id = t.id
    WHERE
        u.id = :my_id
    GROUP BY
        d.id, u.nickname, u.picture_url, d.title, d.content, d.created_at, d.likes
    ORDER BY
        ${sorted}
    LIMIT
        :limit OFFSET :offset
    `;

  const values = { my_id: my_id, limit: limit, offset: offset };
  const [result] = await conn.query(sql, values);

  return result as myDiaryResults[];
};
