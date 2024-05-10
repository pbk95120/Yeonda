import { requestHandler } from '@/api/http';

/**
 * 채팅목록 GET API
 * @param userDate
 */
export const fetchChatList = async () => {
  return await requestHandler('get', '/chatlist');
};

/**
 * 유저간 관계 해제 DELETE API
 * @param userDate
 */
export const deleteUser = async (userId: number) => {
  return await requestHandler('delete', `/chatList/${userId}`);
};

/**
 * 테스트
 * @param userDate
 */
export const login = async (data: { email: string; password: string }) => {
  return await requestHandler('post', `login`, data);
};
