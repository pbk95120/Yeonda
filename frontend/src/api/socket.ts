import { io } from 'socket.io-client';

export const socketConnect = () => {
  return io('http://yeonda.prgms-fullcycle.com:4040');
};
