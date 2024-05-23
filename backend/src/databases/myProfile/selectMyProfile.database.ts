import { TagName } from '@models/tag.model';
import { MyProfile } from '@schemas/myProfile.schema';
import CustomError from '@src/error';
import http from 'http-status-codes';
import { Connection } from 'mysql2/promise';

interface TagId {
  tag_id: number;
}

export const selectMyProfile = async (conn: Connection, user_id: number): Promise<MyProfile> => {
  let sql = `select u.id, u.email, u.nickname, u.gender, u.birth, u.picture_url, a.latitude, a.longitude, a.detail 
  from user u join address a on a.id = u.address_id where u.id = :user_id`;
  let values: {} = { user_id: user_id };
  let [result] = await conn.execute(sql, values);
  if (!result[0]) throw new CustomError(http.NOT_FOUND, '존재하지 않는 사용자');
  const userAddress = result[0];

  sql = 'select t.id, t.name from user_tag ut join tag t on t.id = ut.tag_id where user_id = :user_id';
  values = { user_id: userAddress.id };
  const [tags] = await conn.execute(sql, values);

  return new MyProfile(userAddress, tags as TagName[]);
};
