import { MyProfile } from '@schemas/myProfile.schema';
import CustomError from '@src/error';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';

interface TagId {
  tag_id: number;
}

export const selectMyProfile = async (conn: Connection, email: string): Promise<MyProfile> => {
  let sql = `select u.id, u.email, u.nickname, u.gender, u.birth, u.picture_url, a.latitude, a.longitude, a.detail 
  from user u join address a on a.id = u.address_id where u.email = :email`;
  let values: {} = { email: email };
  let [result] = await conn.execute(sql, values);
  if (!result[0]) throw new CustomError(http.NOT_FOUND, '존재하지 않는 사용자');
  const userAddress = result[0];

  sql = 'select tag_id from user_tag where user_id = :id';
  values = { id: userAddress.id };
  [result] = await conn.execute(sql, values);
  let tags = [];
  for (const row of result as TagId[]) tags.push(row.tag_id);

  return new MyProfile(userAddress, tags);
};
