import { requestHandler } from './http';

export const getMyPage = async () => {
  return await requestHandler('get', '/profile/my');
};

export const withDrawal = async () => {
  return await requestHandler('delete', '/signout');
};

export const getMyPageMyInfo = async () => {
  return await requestHandler('get', '/profile/my/setting');
};

export const patchMyInfoPicture = async () => {
  return await requestHandler('patch', '/profile/my/setting/picture');
};

export const getMyPageMyPref = async () => {
  return await requestHandler('get', '/profile/my/preference');
};

export const patchMyPageMyPref = async () => {
  return await requestHandler('patch', '/profile/my/preference');
};

export const getMyTag = async () => {
  return await requestHandler('get', '/profile/my/tag');
};

export const putMyTag = async () => {
  return await requestHandler('put', '/profile/my/tag');
};
