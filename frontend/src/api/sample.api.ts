import { requestHandler } from '@/api/http';

/**
 * api 테스트
 * @param userDate
 */
export const example = async () => {
  return await requestHandler('get', '');
};
