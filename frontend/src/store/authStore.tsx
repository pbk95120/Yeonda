import { getCookie, removeCookie, setCookie } from '@/utils/cookie';
import { create } from 'zustand';

interface StoreState {
  isLoggedIn: boolean;
  storeLogin: (token: string) => void;
  storeLogout: () => void;
}

export const getToken = () => {
  const token = getCookie('access-token');
  return token;
};

export const setToken = (token: string) => {
  setCookie('access-token', token, { path: '/' });
};

export const removeToken = () => {
  removeCookie('access-token', { path: '/' });
};

export const useAuthStore = create<StoreState>((set) => ({
  isLoggedIn: getToken() ? true : false,
  storeLogin: (token: string) => {
    set({ isLoggedIn: true });
    setToken(token);
  },
  storeLogout: () => {
    set({ isLoggedIn: false });
    removeToken();
  },
}));
