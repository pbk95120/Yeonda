import { Diary, DiaryChange, FetchDiariesParams, Tag, PreferData } from '@/types/type.ts';
import { requestHandler } from '@/api/http';

export const fetchDiaries = async (params: FetchDiariesParams) => {
  return await requestHandler<Diary[]>(
    'get',
    `/diary/my?currentPage=${params.currentPage}&limit=${params.limit}&sort=${params.sort}`,
  );
};

export const fetchDiary = async (diaryId: string) => {
  return await requestHandler<Diary>('get', `/diary/my/${diaryId}`);
};

export const fetchPopularDiaries = async () => {
  return await requestHandler<Diary[]>('get', `/diary/popular`);
};

export const fetchPopularDiariesByTag = async (tagId: number) => {
  return await requestHandler<Diary[]>('get', `/diary/popular/${tagId}`);
};

export const fetchFirstSuggestionDiary = async (preferData: PreferData) => {
  return await requestHandler('post', '/diary/pre-random', preferData);
};

export const fetchSuggestionDiary = async (preferId: number) => {
  return await requestHandler('post', '/diary/random', { prefer_id: preferId });
};

export const likeDiary = async (diaryId: number | undefined) => {
  return await requestHandler('post', `/diary/like/${diaryId}`);
};

export const fetchProfile = async () => {
  return await requestHandler('get', `/profile/my`);
};

export const writeDiary = async (diaryData: FormData) => {
  return await requestHandler('post', '/diary', diaryData);
};

export const changeDiary = async (diaryId: string, changeDiary: DiaryChange) => {
  const { title, content, tags } = changeDiary;
  let changedTags = tags?.map((tag: Tag) => tag.id);
  console.log(changedTags);
  return await requestHandler('put', `/diary/my/${diaryId}`, { title: title, content: content, tags: changedTags });
};

export const removeDiary = async (diaryId: string) => {
  return await requestHandler('delete', `/diary/my/${diaryId}`);
};
