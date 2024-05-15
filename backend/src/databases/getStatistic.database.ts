import { Connection } from 'mysql2/promise';

function transArr(data) {
  let newArray = Object.values(data[0]).map((value) => value);
  let result = newArray.map((value) => (value == null ? 0 : value));
  return result;
}

export const selectDiaryCount = async (conn: Connection) => {
  const sql = `SELECT 
    SUM(DAYOFWEEK(created_at) = 1),
    SUM(DAYOFWEEK(created_at) = 2),
    SUM(DAYOFWEEK(created_at) = 3),
    SUM(DAYOFWEEK(created_at) = 4),
    SUM(DAYOFWEEK(created_at) = 5),
    SUM(DAYOFWEEK(created_at) = 6),
    SUM(DAYOFWEEK(created_at) = 7)
    FROM diary
    WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY);`;

  const [result] = await conn.execute(sql);
  const transResult = transArr(result);
  return transResult;
};

export const selectmatchingCount = async (conn: Connection) => {
  const sql = `SELECT 
      SUM(DAYOFWEEK(created_at) = 1),
      SUM(DAYOFWEEK(created_at) = 2),
      SUM(DAYOFWEEK(created_at) = 3),
      SUM(DAYOFWEEK(created_at) = 4),
      SUM(DAYOFWEEK(created_at) = 5),
      SUM(DAYOFWEEK(created_at) = 6),
      SUM(DAYOFWEEK(created_at) = 7)
      FROM couple
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY);`;

  const [result] = await conn.execute(sql);
  const transResult = transArr(result);
  return transResult;
};

export const selectuserCount = async (conn: Connection) => {
  const sql = `SELECT
      (SELECT COUNT(*) FROM user WHERE DATE(created_at) = CURDATE() - INTERVAL 6 DAY) AS day6_count,
      (SELECT COUNT(*) + day6_count FROM user WHERE DATE(created_at) = CURDATE() - INTERVAL 5 DAY) AS day5_count,
      (SELECT COUNT(*) + day5_count FROM user WHERE DATE(created_at) = CURDATE() - INTERVAL 4 DAY) AS day4_count,
      (SELECT COUNT(*) + day4_count FROM user WHERE DATE(created_at) = CURDATE() - INTERVAL 3 DAY) AS day3_count,
      (SELECT COUNT(*) + day3_count FROM user WHERE DATE(created_at) = CURDATE() - INTERVAL 2 DAY) AS day2_count,
      (SELECT COUNT(*) + day2_count FROM user WHERE DATE(created_at) = CURDATE() - INTERVAL 1 DAY) AS day1_count,
      (SELECT COUNT(*) FROM user WHERE DATE(created_at) = CURDATE()) AS today_count`;

  const [result] = await conn.execute(sql);
  const transResult = transArr(result);
  return transResult;
};
