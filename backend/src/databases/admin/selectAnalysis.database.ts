import { Connection } from 'mysql2/promise';
import { analysis } from '@schemas/admin.schema';

const selectGenderCount = async (conn: Connection) => {
  const sql = `SELECT
      (SELECT COUNT(*) FROM user WHERE gender = 'Male') AS male_count,
      (SELECT COUNT(*) FROM user WHERE gender = 'Female') AS female_count
    `;

  const [result] = await conn.execute(sql);
  return result;
};

const selectAverageDiary = async (conn: Connection) => {
  const sql = `SELECT u.id, u.email, u.picture_url
      FROM user u
      LEFT JOIN diary d 
      ON u.id = d.user_id AND 
      d.created_at >= DATE_SUB(NOW(), INTERVAL 2 WEEK) AND 
      d.created_at <= NOW()
      WHERE d.id IS NULL
    `;

  const [result] = await conn.execute(sql);
  return result;
};

export const selectAnalysis = async (conn: Connection): Promise<analysis> => {
  const gender_count = await selectGenderCount(conn);
  const average_diary = await selectAverageDiary(conn);
  return {
    male_count: gender_count[0].male_count as analysis['male_count'],
    female_count: gender_count[0].female_count as analysis['female_count'],
    average_diary: average_diary as unknown as analysis['average_diary'],
  };
};
