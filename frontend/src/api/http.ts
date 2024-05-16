import axios, { AxiosRequestConfig } from 'axios';
import { DEFAULT_TIMEOUT } from '@/constants/constants';
import { useAuthStore } from '@/store/authStore';
import { refreshToken } from './user.api';

/**
 * Axios 인스턴스 생성
 */
export const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    ...config,
  });
  axiosInstance.interceptors.request.use(
    async (response) => {
      return response;
    },
    async (error) => {
      if (error.response.status === 401) {
        try {
          await refreshToken();
        } catch (e) {
          window.location.href = '/login';
          useAuthStore.getState().storeLogout();
          return Promise.reject(e);
        }
      }
      return Promise.reject(error);
    },
  );

  return axiosInstance;
};

export const httpClient = createClient();

type RequestMethod = 'get' | 'post' | 'put' | 'delete';

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
  }
  return response.data;
};
