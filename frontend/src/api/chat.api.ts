import { requestHandler } from '@/api/http';

/**
 * 채팅목록 GET API
 * @param userDate
 */
export const fetchChatList = async () => {
  return await requestHandler('get', '/chatlist');
};

/**
 * 채팅삭제 DELETE API
 * @param userDate
 */
export const deleteChat = async (userId: number) => {
  return await requestHandler('delete', `/likes/${userId}`);
};

/**
 * 상대유저 프로필 GET API
 * @param userDate
 */
export const fetchProfile = async (userId: number) => {
  return await requestHandler('get', `/profile/your/${userId}`);
};
