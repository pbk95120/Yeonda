import { Diary } from '@/types/type.ts';
import { requestHandler } from '@/api/http';

export const fetchDiaries = async () => {
  return await requestHandler<Diary[]>('get', 'diary/my');
};

export const fetchDiary = async (diaryId: number) => {
  return await requestHandler<Diary>('get', `diary/my/${diaryId}`);
};

export const fetchPopularDiaries = async () => {
  return await requestHandler<Diary[]>('get', `diary/popular`);
};

export const fetchPopularDiariesByTag = async (tagId: string) => {
  return await requestHandler<Diary[]>('get', `diary/popular/${tagId}`);
};

export const fetchProfile = async () => {
  return await requestHandler('get', `profile/my`);
};
