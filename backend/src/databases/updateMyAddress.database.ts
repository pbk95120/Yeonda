import CustomError from '@src/error';
import { transactionWrapper } from '@src/middlewares/transactionWrapper';
import { getGeoCode } from '@src/utils/getGeoCode';
import http from 'http-status-codes';
import { Connection, ResultSetHeader } from 'mysql2/promise';

export const updateMyAddress = async (conn: Connection, email: string, address: string): Promise<void> => {
  let sql = 'select id from user where email = :email';
  let values: {} = { email: email };
  let [result] = await conn.execute(sql, values);
  let user_id;
  if (!result[0]) throw new CustomError(http.NOT_FOUND, '존재하지 않는 사용자');
  user_id = result[0].id;

  sql = 'select id from address where detail = :detail';
  values = { detail: address };
  [result] = await conn.execute(sql, values);
  let address_id;
  if (result[0]?.id) address_id = result[0].id;

  const callback = async (user_id: number, address: string, address_id: number) => {
    if (address_id) {
      sql = 'update user set address_id = :address_id where id = :user_id';
      values = { address_id: address_id, user_id: user_id };
      await conn.execute(sql, values);
    } else {
      const geoCode = await getGeoCode(address);
      sql = 'insert into address (latitude, longitude, detail) values (:latitude, :longitude, :detail)';
      values = { latitude: geoCode.latitude, longitude: geoCode.longitude, detail: address };
      const result = await conn.execute<ResultSetHeader>(sql, values);
      const new_address_id = result[0].insertId;

      sql = 'update user set address_id = :address_id where id = :user_id';
      values = { address_id: new_address_id, user_id: user_id };
      await conn.execute(sql, values);
    }
  };

  await transactionWrapper(conn, callback)(user_id, address, address_id);
};
