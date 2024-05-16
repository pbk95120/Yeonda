import { transactionWrapper } from '@middlewares/transactionWrapper.middleware';
import { RawSignupPicUrl, Signup } from '@schemas/signup.schema';
import CustomError from '@src/error';
import { getGeoCode } from '@utils/getGeoCode';
import { saveFile } from '@utils/saveFile';
import http from 'http-status-codes';
import { Connection, ResultSetHeader } from 'mysql2/promise';

export const insertUser = async (
  conn: Connection,
  info: Signup,
  data: RawSignupPicUrl,
  file: Express.Multer.File,
): Promise<void> => {
  const { user, address, preference, user_tag } = info;

  let sql = 'select id from user where email = :email';
  let values: {} = { email: user.email };
  let [result] = await conn.execute(sql, values);
  if (result[0]) throw new CustomError(http.CONFLICT, '이미 존재하는 사용자');

  const geoCode = await getGeoCode(address);

  let address_id;
  sql = 'select id from address where detail = :detail';
  values = { detail: address };
  [result] = await conn.execute(sql, values);
  if (result[0]) address_id = result[0].id;

  const callback = async (address_id: number): Promise<void> => {
    if (!address_id) {
      sql = `insert into address (latitude, longitude, detail) values (:latitude, :longitude, :detail)`;
      values = {
        latitude: geoCode.latitude,
        longitude: geoCode.longitude,
        detail: address,
      };
      [result] = await conn.execute<ResultSetHeader>(sql, values);
      address_id = result.insertId;
    }

    if (data.picture_url) saveFile(data.picture_url, file.buffer);

    sql = `insert into user (email, password, nickname, gender, birth, picture_url, address_id) 
    values (:email, :password, :nickname, :gender, :birth, :picture_url, :address_id)`;
    values = {
      email: user.email,
      password: user.password,
      nickname: user.nickname,
      gender: user.gender,
      birth: user.birth,
      picture_url: user.picture_url,
      address_id: address_id,
    };
    [result] = await conn.execute<ResultSetHeader>(sql, values);
    const user_id = result.insertId;

    sql = `insert into preference (user_id, gender, distance, start_age, end_age) 
    values (:user_id, :gender, :distance, :start_age, :end_age)`;
    values = {
      user_id: user_id,
      gender: preference.gender,
      distance: preference.distance,
      start_age: preference.start_age,
      end_age: preference.end_age,
    };
    await conn.execute(sql, values);

    for (const id of user_tag.tags) {
      sql = 'insert into user_tag values (:user_id, :tag_id)';
      values = {
        user_id: user_id,
        tag_id: id,
      };
      await conn.execute(sql, values);
    }
  };

  await transactionWrapper(conn, callback)(address_id);
};
