import { Server } from 'socket.io';
import { setupChat, exchangeMessages } from '@sockets/controller';
import { S3_SaveController } from '@sockets/middleware';
import { authorizationSchema, chatMessageSchema } from '@sockets/schemas';
import logError from '@sockets/util';

const socketHandler = (io: Server) => {
  io.on('connection', (socket) => {
    socket.on('joinRoom', async (data) => {
      try {
        const { error } = authorizationSchema.validate(data);
        if (error) {
          socket.disconnect();
          throw new Error(data);
        }

        const { couple_id, user1_id, user2_id } = data;
        socket.data.couple_id = couple_id;
        socket.data.my_id = user1_id;
        socket.data.partner_id = user2_id;

        const result = await setupChat(couple_id, user2_id);
        socket.join(couple_id);
        io.to(socket.id).emit('partnerInfo', result);
      } catch (error) {
        socket.emit('error', error);
        logError('joinRoom: 에러 발생', error);
      }
    });

    socket.on('sendMessage', async (data) => {
      try {
        if (!socket.data.partner_id) {
          socket.disconnect();
          throw new Error('파트너 정보가 없습니다.');
        }
        const user_id = socket.data.my_id;
        const { error } = chatMessageSchema.validate(data);
        if (error) {
          throw new Error('입력 데이터가 잘못되었습니다.');
        }

        const { couple_id, message, file, fileName } = data;
        const now = new Date();
        const send_at = now.toISOString().slice(0, 19).replace('T', ' ');
        const picture_url = !file ? null : await S3_SaveController(file, fileName);

        const room = io.sockets.adapter.rooms.get(couple_id);
        const is_read = room ? (room.size == 2 ? 1 : 0) : 0;

        const chatInfo = await exchangeMessages(
          parseInt(couple_id),
          parseInt(user_id),
          picture_url,
          message,
          send_at,
          is_read,
        );
        await io.to(couple_id.toString()).emit('receiveMessage', {
          id: chatInfo.id,
          user_id: parseInt(user_id),
          message: message,
          picture_url: picture_url,
          send_at: send_at,
          show_date: chatInfo.show_date,
        });
      } catch (error) {
        socket.emit('error', error.message);
        logError('sendMessage: 에러 발생', error);
      }
    });

    socket.on('disconnectRequest', async () => {
      try {
        socket.disconnect();
      } catch (error) {
        logError(socket.id, error);
      }
    });
  });
};

export default socketHandler;
