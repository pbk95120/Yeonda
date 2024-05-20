import { Connection } from 'mysql2/promise';
import { myDiaryResults } from '@schemas/myDiary.shema';

export const selectMyDiaryDetail = async (
  conn: Connection,
  user_id: number,
  diary_id: number,
): Promise<myDiaryResults[]> => {
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
        u.id = :user_id AND d.id = :diary_id
    GROUP BY
        d.id, u.nickname, u.picture_url, d.title, d.content, d.created_at, d.likes
    `;

  const values: {} = { user_id: user_id, diary_id: diary_id };
  const [result] = await conn.execute(sql, values);

  return result as myDiaryResults[];
};
