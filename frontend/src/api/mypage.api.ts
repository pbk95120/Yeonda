import { requestHandler } from './http';

export const getMyPage = async () => {
  return await requestHandler('get', '/profile/my');
};
