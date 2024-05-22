import io from 'socket.io-client';

export const socketConnect = () => {
  return io(import.meta.env.SOCKET_URL);
};
