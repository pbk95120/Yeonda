import { io } from 'socket.io-client';

export const socketConnect = (id: string) => {
  return io('/socket.io', {
    path: '/chat',
    extraHeaders: {
      couple_id: id,
      user1_id: localStorage.getItem('user1_id') ?? '',
      email: localStorage.getItem('email') ?? '',
    },
  });
};
