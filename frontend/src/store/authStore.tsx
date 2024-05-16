import { create } from 'zustand';

interface StoreState {
  isLoggedIn: boolean;
  storeLogin: (email: string) => void;
  storeLogout: () => void;
}

export const getEmail = () => {
  const email = localStorage.getItem('email');
  return email;
};

const setEmail = (email: string) => {
  localStorage.setItem('email', email);
};
export const removeEmail = () => {
  localStorage.removeItem('email');
};

export const useAuthStore = create<StoreState>((set) => {
  return {
    isLoggedIn: getEmail() ? true : false,
    storeLogin: (data: string) => {
      set({ isLoggedIn: true });
      setEmail(data);
    },
    storeLogout: () => {
      set({ isLoggedIn: false });
      removeEmail();
    },
  };
});
