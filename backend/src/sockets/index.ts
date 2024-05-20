import { Server } from 'socket.io';
import { setupChat, exchangeMessages } from '@sockets/controller';
import { S3_SaveController } from '@sockets/middleware';
import { authorizationSchema, chatMessageSchema } from '@sockets/schemas';
import { getUserInfoFromCookie } from '@sockets/util';
import logger from '@src/logger';

const socketHandler = (io: Server) => {
  io.use((socket, next) => {
    try {
      const cookies = socket.handshake.headers.cookie;
      const [user_id, email] = getUserInfoFromCookie(cookies);
      socket.data.user_id = user_id;
      socket.data.email = email;
      next();
    } catch (error) {
      next(error);
    }
  });

  io.on('connection', (socket) => {
    socket.on('joinRoom', async (data) => {
      try {
        const { couple_id, partner_id } = data;
        const { error } = authorizationSchema.validate(couple_id, partner_id);
        if (error) {
          socket.emit('error', '입장 정보를 확인해주세요.');
          socket.disconnect();
          return error;
        }

        const result = await setupChat(couple_id, partner_id);

        socket.join(couple_id);
        await io.to(couple_id).emit('partnerInfo', result);
      } catch (error) {
        socket.emit('error', error);
        logger.error(error);
      }
    });

    socket.on('sendMessage', async (data) => {
      try {
        const user_id = socket.data.user_id;
        const { error } = chatMessageSchema.validate(data);
        if (error) {
          socket.emit('error', '입력 데이터가 잘못되었습니다.');
          return error;
        }
        const { couple_id, message, file, fileName } = data;

        const now = new Date();
        const send_at = now.toISOString().slice(0, 19).replace('T', ' ');
        const picture_url = file === (null || 'null') ? null : await S3_SaveController(file, fileName);

        const room = io.sockets.adapter.rooms.get(couple_id);
        const is_read = room ? (room.size == 2 ? 1 : 0) : 0;

        await exchangeMessages(parseInt(couple_id), parseInt(user_id), picture_url, message, send_at, is_read);
        io.to(couple_id).emit('receiveMessage', {
          user_id: user_id,
          message: message,
          picture_url: picture_url,
          send_at: send_at,
          is_read: is_read,
        });
      } catch (error) {
        console.log(error);
        socket.emit('error', error);
        logger.error(error.stack);
      }
    });

    socket.on('disconnectRequest', async () => {
      try {
        socket.disconnect();
      } catch (erorr) {
        logger.error('연결 해제 실패');
      }
    });
  });
};

export default socketHandler;
