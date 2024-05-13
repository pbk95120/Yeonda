import { Connection } from 'mysql2/promise';

// 성비 - [남성, 여성]
export const selectGenderCount = async (conn: Connection) => {
  const sql = `SELECT
    (SELECT COUNT(*) FROM user WHERE gender = 'Male') AS male_count,
    (SELECT COUNT(*) FROM user WHERE gender = 'Female') AS female_count;`;

  const [result] = await conn.execute(sql);
  return result;
};

// 2주 이내 일기 작성하지 않은 유저 목록
export const selectAverageDiary = async (conn: Connection) => {
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
