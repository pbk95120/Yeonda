import { Diary, DiaryChange } from '@/types/type.ts';
import { requestHandler } from '@/api/http';

interface FetchDiariesParams {
  currentPage: number;
  limit: number;
}

export const fetchDiaries = async (params: FetchDiariesParams) => {
  return await requestHandler<Diary[]>('get', `/diary/my?page=${params.currentPage}&limit=${params.limit}`);
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

export const writeDiary = async (diaryData: FormData) => {
  return await requestHandler('post', 'diary', diaryData);
};

export const changeDiary = async (diaryId: string, changeDiary: DiaryChange) => {
  return await requestHandler<DiaryChange>('put', `/diary/my/${diaryId}`, changeDiary);
};

export const removeDiary = async (diaryId: string) => {
  return await requestHandler<Diary>('delete', `/diary/my/${diaryId}`);
};
