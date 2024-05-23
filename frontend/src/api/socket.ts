import io from 'socket.io-client';

export const socketConnect = () => {
  return io(import.meta.env.VITE_SOCKET_URL);
};
