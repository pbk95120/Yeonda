import { Socket } from 'socket.io';
import { databaseConnector } from '@sockets/util';
import { updateIsRead, getPartnerInfo, getRecordChat, createChat } from '@sockets/database';
import { getPartnerInfoSchema, getRecordChatSchema, createChatSchema } from './schemas';
import { saveFile } from '@utils/saveFile';
import { reformImg } from '@utils/reformImg';
import { io } from '@src/app';
import { errorHandler } from '@sockets/middleware';
import http from 'http-status-codes';

export const setupChat = async (socket: Socket, couple_id: number) => {
  try {
    const user_id = socket.data.user_id;
    const partner_id = socket.data.partner_id;

    socket.join(couple_id.toString());

    const room = io.sockets.adapter.rooms.get(couple_id.toString());
    if (room.size > 2) errorHandler(socket, http.BAD_REQUEST, '채팅방 인원 초과');

    await databaseConnector(updateIsRead)(socket, partner_id, couple_id);
    console.log(room);

    const partner = await databaseConnector(getPartnerInfo)(socket, user_id, partner_id);
    const partner_error = getPartnerInfoSchema.validate(partner);
    if (partner_error.error) errorHandler(socket, http.BAD_REQUEST, partner_error.error.message, partner_error.error);
    io.to(couple_id.toString()).emit('partner-info', partner);

    const record = await databaseConnector(getRecordChat)(socket, couple_id);
    if (record) {
      const record_error = getRecordChatSchema.validate(record[0]);
      if (record_error.error) errorHandler(socket, http.BAD_REQUEST, record_error.error.message, record_error.error);
      io.to(couple_id.toString()).emit('chat-record', record);
    }
  } catch (err) {
    errorHandler(socket, http.INTERNAL_SERVER_ERROR, err.error.message, err.error);
  }
};

export const exchangeMessages = async (
  socket: Socket,
  couple_id: number,
  message: string,
  file: any,
  is_read: number,
) => {
  try {
    const url = file !== null ? reformImg(file) : null;
    const save = url !== null ? saveFile(url, file.buffer) : null;
    // TODO: 파일 저장

    const chat = await databaseConnector(createChat)(socket, couple_id, message, url, is_read);
    const chat_error = createChatSchema.validate(chat);
    if (chat_error.error) errorHandler(socket, http.BAD_REQUEST, chat_error.error.message, chat_error.error);
    io.to(couple_id.toString()).emit('receive-message', chat);
  } catch (err) {
    errorHandler(socket, http.INTERNAL_SERVER_ERROR, err.error.message, err.error);
  }
};

export const deleteState = async (socket: Socket) => {
  try {
    socket.disconnect();
  } catch (err) {
    errorHandler(socket, http.INTERNAL_SERVER_ERROR, err.error.message, err.error);
  }
};
