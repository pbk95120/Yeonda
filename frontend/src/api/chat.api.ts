import { requestHandler } from '@/api/http';
import { FetchOtherDiariesProps } from '@/types/type';

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

/**
 * 프로필페이지 남의일기 GET API
 * @param userDate
 */
export const fetchOtherDiary = async (data: FetchOtherDiariesProps) => {
  return await requestHandler('get', `/diary/your/${data.userId}?currentPage=${data.currentPage}&limit=${data.limit}`);
};
