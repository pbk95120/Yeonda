import axios, { AxiosRequestConfig } from 'axios';
import { DEFAULT_TIMEOUT } from '@/constants/constants';
import { useAuthStore } from '@/store/authStore';
import { refreshToken } from './user.api';
import { useNavigate } from 'react-router-dom';

/**
 * Axios 인스턴스 생성
 */
export const createClient = (config?: AxiosRequestConfig) => {
  const navigate = useNavigate();
  const AUTH = useAuthStore.getState();
  const axiosInstance = axios.create({
    baseURL: '/api',
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      Authorization: AUTH.email ? `Bearer ${AUTH.email}` : '',
    },
    withCredentials: true,
    ...config,
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        refreshToken().then(
          () => {
            navigate(0);
          },
          () => {
            alert('로그인이 만료되었습니다.');
            useAuthStore.getState().storeLogout();
            navigate('/login');
          },
        );
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
    default:
      throw new Error('Invalid request method');
  }
  return response.data;
};
