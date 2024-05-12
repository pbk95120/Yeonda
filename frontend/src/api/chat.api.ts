import { requestHandler } from '@/api/http';

/**
 * 채팅목록 GET API
 * @param userDate
 */
export const fetchChatList = async () => {
  return await requestHandler('get', '/chatlist');
};
