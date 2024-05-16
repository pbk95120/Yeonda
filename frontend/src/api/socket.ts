import { io } from 'socket.io-client';

export const socket = async (id: string) => {
  return io('/api', {
    path: '/chat',
    extraHeaders: {
      couple_id: id.toString(),
      user_id: localStorage.getItem('user1_id') ?? '',
      email: localStorage.getItem('email') ?? '',
    },
  });
};
