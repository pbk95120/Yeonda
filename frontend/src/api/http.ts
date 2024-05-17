import axios, { AxiosRequestConfig } from 'axios';
import { DEFAULT_TIMEOUT } from '@/constants/constants';
import { useAuthStore } from '@/store/authStore';

/**
 * Axios 인스턴스 생성
 */
export const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: '/api',
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    ...config,
  });
  axiosInstance.interceptors.request.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        window.location.href = '/login';
        useAuthStore.getState().storeLogout();
        return;
      }
      return Promise.reject(error);
    },
  );

  return axiosInstance;
};

export const httpClient = createClient();

type RequestMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export const requestHandler = async <T>(method: RequestMethod, url: string, payload?: T) => {
  let response;
  switch (method) {
    case 'post':
      response = await httpClient.post(url, payload);
      break;
    case 'get':
      response = await httpClient.get(url);
      break;
    case 'put':
      response = await httpClient.put(url, payload);
      break;
    case 'delete':
      response = await httpClient.delete(url);
      break;
    case 'patch':
      response = await httpClient.patch(url, payload);
      break;
  }
  return response.data;
};
