import { Connection } from 'mysql2/promise';

export const selectMyDiary = async (
  conn: Connection,
  my_id: number,
  currentPage: number,
  limit: number,
  sort: number,
) => {
  const sorted = sort == 1 ? 'd.likes DESC' : 'd.created_at DESC';
  const offset = (currentPage - 1) * limit;

  const sql = `SELECT d.id, u.nickname, u.picture_url, d.title, d.content AS content, d.created_at, d.likes, JSON_ARRAYAGG(dt.tag_id) AS tags
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
        ${sorted}
    LIMIT 
        :limit OFFSET :offset
    `;

  const values = { my_id: my_id, limit: limit, offset: offset };
  const [result] = await conn.execute(sql, values);

  return result;
};
