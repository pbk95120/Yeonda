import { Tag } from '@/types/type';
import { httpClient } from './http';

export const statistic = async () => {
  const response = await httpClient.get('/admin/user/statistic');
  return response.data;
};

export const analysis = async () => {
  const response = await httpClient.get('/admin/user/analysis');
  return response.data;
};

export const addTag = async (tag: string) => {
  const response = await httpClient.post('/admin/tag', { tag });
  return response.data;
};

export const removeTag = async (tag: Tag) => {
  const response = await httpClient.delete(`/admin/tag/${tag.id}`);
  return response.data;
};
