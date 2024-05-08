import { Server } from 'socket.io';

const socketHandler = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('소켓 연결 :', socket.id);
  });
};

export default socketHandler;
