import { Server } from 'socket.io';
import { setupChat, exchangeMessages, deleteState } from '@sockets/controller';
import { authentication, authorization } from '@sockets/middleware';
import { databaseConnector } from '@sockets/util';
import { errorHandler } from '@sockets/middleware';
import http from 'http-status-codes';

const socketHandler = (io: Server) => {
  io.on('connection', async (socket) => {
    try {
      console.log('소켓 연결 :', socket.id);
      const token = socket.handshake.auth.token;
      const id = socket.handshake.headers.couple_id;
      await databaseConnector(authentication)(socket, token, id);
    } catch (err) {
      errorHandler(socket, http.BAD_REQUEST, '클라이언트 설정 오류', err);
    }

    socket.on('join-room', async (data) => {
      const { couple_id } = data;
      await setupChat(socket, couple_id);
      console.log('방 연결', couple_id);
    });
    socket.on('send-message', async (data) => {
      const { couple_id, message, file } = data;
      await databaseConnector(authorization)(socket, couple_id);
      const room = io.sockets.adapter.rooms.get(couple_id.toString());
      const is_read = room ? (room.size == 2 ? 1 : 0) : 0;
      await exchangeMessages(socket, couple_id, message, file, is_read);
      console.log('메시지 송수신');
    });
    socket.on('disconnect', async () => {
      await deleteState(socket);
      console.log('연결 종료', socket.id);
    });
  });
};

export default socketHandler;
