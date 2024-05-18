import { FirstRandomDiaryResponse, PreferencesRequest } from '@schemas/diary.schema';
import CustomError from '@src/error';
import { selectRandomElementInArray } from '@utils/selectRandomElementInArray';
import http from 'http-status-codes';
import { Connection, RowDataPacket } from 'mysql2/promise';

export const selectFirstRandomDiary = async (
  conn: Connection,
  body: PreferencesRequest,
): Promise<FirstRandomDiaryResponse> => {
  const { user_id, gender, distance, start_age, end_age } = body;

  let sql = `select a.id, a.latitude, a.longitude from address a
  join user u on u.address_id = a.id where u.id = :user_id`;
  let values: {} = { user_id: user_id };
  let [result] = await conn.execute(sql, values);

  const { id: origin_id, latitude: origin_lat, longitude: origin_lng } = result[0];
  const max_distance = distance * 1000;
  const lat_range = max_distance / 111000;
  const lng_range = max_distance / (111000 * Math.cos(origin_lat * (Math.PI / 180)));

  sql = `
  select u.id,
  st_distance_sphere(point(:origin_lng, :origin_lat), point(a.longitude, a.latitude)) as distance
  from address a
  join user u on u.address_id = a.id
  where a.id != :origin_id
  and a.latitude between (:origin_lat - :lat_range) and (:origin_lat + :lat_range)
  and a.longitude between (:origin_lng - :lng_range) and (:origin_lng + :lng_range)
  and u.gender = :gender
  and timestampdiff(year, u.birth, curdate()) between :start_age and :end_age
  having distance <= :max_distance
  order by rand()
  limit 10
  `;
  values = {
    origin_id: origin_id,
    origin_lng: origin_lng,
    origin_lat: origin_lat,
    lat_range: lat_range,
    lng_range: lng_range,
    max_distance: max_distance,
    gender: gender,
    start_age: start_age,
    end_age: end_age,
  };
  [result] = await conn.execute<RowDataPacket[]>(sql, values);
  if (!result[0]) throw new CustomError(http.NOT_FOUND, '조건에 맞는 랜덤 일기 없음');
  let prefer_id = [];
  for (const row of result) prefer_id.push(row.id);

  const random_id = selectRandomElementInArray(prefer_id);
  sql = `
  select d.*, json_arrayagg(json_object('id', t.id, 'name', t.name)) as tags 
  from diary d
  join diary_tag dt on dt.diary_id = d.id
  join tag t on t.id = dt.tag_id
  left join likes l on l.diary_id = d.id and l.user_id = :user_id
  where d.user_id = :random_id and l.user_id is null
  group by d.id
  order by rand()
  limit 1;
  `;
  values = { user_id: user_id, random_id: random_id };
  [result] = await conn.execute(sql, values);
  let response = result[0];
  response.prefer_id = prefer_id;

  return response as FirstRandomDiaryResponse;
};
