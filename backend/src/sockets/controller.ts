import { Socket } from 'socket.io';
import { databaseConnector, getUserIdByEmail, emailFromToken } from '@sockets/util';
import { updateCouple, getPartnerInfo, getRecordChat, createChat } from '@sockets/database';
import { updateCoupleSchema, getPartnerInfoSchema, getRecordChatSchema } from './schemas';
import { saveFile } from '@utils/saveFile';
import { reformImg } from '@utils/reformImg';
import { io } from '@src/app';
import CustomError from '@src/error';
import http from 'http-status-codes';

export const setupChat = async (socket: Socket, token: string, couple_id: number) => {
  const coupleId = couple_id.toString();
  const email = await emailFromToken(token);
  const user = await databaseConnector(getUserIdByEmail)(email);
  const couple_check = await databaseConnector(updateCouple)(socket, coupleId, user[0].id);

  // 데이터 유효성 검사
  // if (updateCoupleSchema.validate(couple_check)) throw new CustomError(TODO:, '잘못된 접근');
  // if (!couple_check) throw new CustomError(http.NOT_FOUND, '커플 정보를 찾지 못했습니다.');

  socket.join(coupleId);

  const partner = await databaseConnector(getPartnerInfo)(user[0].id, couple_check);
  const record = await databaseConnector(getRecordChat)(coupleId);

  // 데이터 유효성 검사
  // if (getPartnerInfoSchema.validate(partner)) throw new CustomError(http.NOT_FOUND, '파트너 정보를 찾지 못했습니다.');
  // if (getRecordChatSchema.validate(record)) throw new CustomError(http.NOT_FOUND, '채팅값 문제');

  io.to(coupleId).emit('partnerinfo', partner);
  io.to(coupleId).emit('chatrecord', record);
};

export const exchangeMessages = async (socket: Socket, data: any) => {
  const { couple_id, message, file } = data;
  const coupleId = String(couple_id);
  const room = io.sockets.adapter.rooms.get(couple_id);
  const numberOfSockets = room ? room.size : 0;
  const is_read = numberOfSockets == 2 ? 1 : 0;
  const url = reformImg(file);
  const save = saveFile(url, file.buffer);

  const Chat = await databaseConnector(createChat)(socket, String(couple_id), message, file, is_read);
  io.to(coupleId).emit('receivemessage', Chat);
};
