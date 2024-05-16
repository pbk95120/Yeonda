import 'dotenv/config';
import { Socket } from 'socket.io';
import { Connection } from 'mysql2/promise';
import { RowDataPacket } from 'mysql2';
import { databaseConnector, emailFromToken, getUserIdByEmail } from '@sockets/util';
import { deleteState } from '@sockets/controller';
import { authorizationSchema } from './schemas';

export const authentication = async (conn: Connection, socket: Socket, token: string, id: string) => {
  try {
    // const email = token; 토큰 없이 테스트
    const email = await emailFromToken(socket, token);
    const user = await databaseConnector(getUserIdByEmail)(socket, email);

    const sql = `SELECT user1_id, user2_id FROM couple WHERE id = :id`;
    const values = { id: parseInt(id) };
    const [result] = await conn.execute<RowDataPacket[]>(sql, values);
    if (result.length == 0) {
      socket.emit('error', { message: '상대방 유저와 채팅방이 없습니다.' });
      socket.disconnect();
    } else {
      socket.data.user_id = user[0].id;
      socket.data.partner_id = result[0].user1_id == user[0].id ? result[0].user2_id : result[0].user1_id;
    }
  } catch (err) {
    console.log('비정상적인 접근 종료: ', socket.id);
    socket.disconnect();
  }
};

export const authorization = async (conn: Connection, socket: Socket, couple_id: number) => {
  const { error } = authorizationSchema.validate(socket.data);

  const { user_id, partner_id } = socket.data;
  const sql = `SELECT * FROM couple WHERE id = :id AND ((user1_id = :user1_id AND user2_id = :user2_id) OR (user2_id = :user1_id AND user1_id = :user2_id))`;
  const values = { id: couple_id, user1_id: user_id, user2_id: partner_id };
  const [result] = await conn.execute<RowDataPacket[]>(sql, values);

  if (error || result.length == 0) {
    socket.emit('error', { message: error });
    console.log('권한 없는 유저 종료: ', socket.id);
    await deleteState(socket);
  }
};
