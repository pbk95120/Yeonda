import { patchMyPref } from '@/types/mypage';
import { requestHandler } from './http';

export const getMyPage = async () => {
  return await requestHandler('get', '/profile/my');
};

export const getMyPageMyInfo = async () => {
  return await requestHandler('get', '/profile/my/setting');
};

export const patchMyInfoPicture = async () => {
  return await requestHandler('patch', '/profile/my/setting/picture');
};

export const patchMyInfoAddress = async (address: string) => {
  return await requestHandler('patch', '/profile/my/setting/address', { address });
};

export const getMyPageMyPref = async () => {
  return await requestHandler('get', '/profile/my/preference');
};

export const patchMyPageMyPref = async ({ gender, distance, start_age, end_age }: patchMyPref) => {
  return await requestHandler('patch', '/profile/my/preference', { gender, distance, start_age, end_age });
};

export const getMyTag = async () => {
  return await requestHandler('get', '/profile/my/tag');
};

export const putMyTag = async () => {
  return await requestHandler('put', '/profile/my/tag');
};

export const signOut = async (password: string) => {
  return await requestHandler('post', '/signout', { password });
};