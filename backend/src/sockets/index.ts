import { Server } from 'socket.io';
import CustomError from '@src/error';
import http from 'http-status-codes';
import { setupChat, exchangeMessages, deleteState } from './controller';

const socketHandler = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('소켓 연결 :', socket.id);
    const token = socket.handshake.auth.token;
    if (!token) throw new CustomError(http.UNAUTHORIZED, '토큰이 없습니다.');
    socket.on('joinroom', async (data) => {
      const { couple_id } = data;
      await setupChat(socket, token, couple_id);
      console.log('방 연결', couple_id);
    });
    socket.on('sendmessage', (data) => {
      exchangeMessages(socket, data);
      console.log('메시지 송수신');
    });
    socket.on('disconnect', async () => {
      await deleteState(socket);
      console.log('연결 종료', socket.id);
    });
  });
};

export default socketHandler;
