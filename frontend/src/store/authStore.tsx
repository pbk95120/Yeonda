import { create } from 'zustand';

interface StoreState {
  isLoggedIn: boolean;
  storeLogin: (token: string) => void;
  storeLogout: () => void;
}

export const getEmail = () => {
  const email = localStorage.getItem('email');
  return email;
};

export const setEmail = (email: string) => {
  localStorage.setItem('email', email);
};

export const removeEmail = () => {
  localStorage.removeItem('email');
};

export const useAuthStore = create<StoreState>((set) => ({
  isLoggedIn: getEmail() ? true : false,
  email: getEmail(),
  storeLogin: (email: string) => {
    setEmail(email);
    set({ isLoggedIn: true });
  },
  storeLogout: () => {
    removeEmail();
    set({ isLoggedIn: false });
  },
}));
