import { Socket } from 'socket.io';
import { databaseConnector } from '@sockets/util';
import { getPartnerInfo, getRecordChat, createChat } from '@sockets/database';
import { getPartnerInfoSchema, getRecordChatSchema, createChatSchema } from './schemas';
import { saveFile } from '@utils/saveFile';
import { reformImg } from '@utils/reformImg';
import { io } from '@src/app';

export const setupChat = async (socket: Socket, couple_id: number) => {
  const user_id = socket.data.user_id;
  const partner_id = socket.data.partner_id;

  socket.join(couple_id.toString());

  const partner = await databaseConnector(getPartnerInfo)(socket, user_id, partner_id);
  const partner_error = getPartnerInfoSchema.validate(partner);
  if (partner_error.error) socket.emit('error', { message: partner_error.error });
  io.to(couple_id.toString()).emit('partner-info', partner);

  const record = await databaseConnector(getRecordChat)(couple_id);
  const record_error = getRecordChatSchema.validate(record[0]);
  if (record_error.error) socket.emit('error', { message: record_error.error });
  io.to(couple_id.toString()).emit('chat-record', record);
};

export const exchangeMessages = async (
  socket: Socket,
  couple_id: number,
  message: string,
  file: any,
  is_read: number,
) => {
  const url = file !== null ? reformImg(file) : null;
  const save = url !== null ? saveFile(url, file.buffer) : null;
  // TODO: 파일 저장

  const chat = await databaseConnector(createChat)(socket, couple_id, message, url, is_read);
  const chat_error = createChatSchema.validate(chat);
  if (chat_error.error) socket.emit('error', { message: chat_error.error });
  io.to(couple_id.toString()).emit('receive-message', chat);
};

export const deleteState = async (socket: Socket) => {
  socket.disconnect();
  // const rooms = Array.from(socket.rooms);
  // if (rooms.length !== 0) {
  //   rooms.forEach((room) => {
  //     socket.leave(room);
  //   });
  // } 방법 2
};
