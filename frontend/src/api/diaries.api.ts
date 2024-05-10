import { Diary } from '@/types/type.ts';
import { requestHandler } from '@/api/http';

export const fetchDiaries = async () => {
  return await requestHandler<Diary[]>('get', '/diary/my');
};

export const fetchDiary = async (diaryId: number) => {
  return await requestHandler<Diary>('get', `/diary/my/${diaryId}`);
};
