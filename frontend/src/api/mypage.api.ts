import { requestHandler } from './http';

export const getMyPage = async () => {
  return await requestHandler('get', '/profile/my');
};

export const withDrawl = async () => {
  return await requestHandler('delete');
};
