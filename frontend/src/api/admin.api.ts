import { httpClient } from './http';

export const statistic = async () => {
  const response = await httpClient.get('/admin/user/statistic');
  return response.data;
};

export const analysis = async () => {
  const response = await httpClient.get('/admin/user/analysis');
  return response.data;
};
