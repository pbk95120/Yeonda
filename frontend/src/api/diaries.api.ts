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

export const fetchFirstSuggestionDiary = async (preferData: any) => {
  return await requestHandler('post', 'diary/pre-random', preferData);
};

export const fetchSuggestionDiary = async (preferId: number) => {
  return await requestHandler('post', 'diary/random', { prefer_id: preferId });
};

export const fetchPreference = async (): Promise<number[]> => {
  return await requestHandler<number[]>('get', 'profile/my/preference');
};

export const likeDiary = async (diaryId: number) => {
  return await requestHandler('post', `diary/like/${diaryId}`);
};
export const fetchProfile = async () => {
  return await requestHandler('get', `profile/my`);
};

export const writeDiary = async (diaryData: FormData) => {
  return await requestHandler('post', 'diary', diaryData);
};
