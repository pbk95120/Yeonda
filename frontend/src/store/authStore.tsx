import { create } from 'zustand';

interface StoreState {
  isLoggedIn: boolean;
  email: string;
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
    email: '',
    isLoggedIn: getEmail() ? true : false,
    storeLogin: (data: string) => {
      console.log(data);
      set({ isLoggedIn: true, email: data });
      setEmail(data);
    },
    storeLogout: () => {
      set({ isLoggedIn: false, email: '' });
      set({ email: '' });
      removeEmail();
    },
  };
});
