import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Pref {
  gender: string;
  start_age: number;
  end_age: number;
  distance: number;
}

interface StoreState {
  isLoggedIn: boolean;
  storeLogin: (email: string, pref: Pref) => void;
  storeLogout: () => void;
  gender: string;
  start_age: number;
  end_age: number;
  distance: number;
}

export const getEmail = () => {
  return localStorage.getItem('email');
};

const setEmail = (email: string) => {
  localStorage.setItem('email', email);
};

export const removeEmail = () => {
  localStorage.removeItem('email');
};

export const useAuthStore = create(
  persist<StoreState>(
    (set, get) => ({
      isLoggedIn: !!getEmail(),
      gender: '',
      start_age: 0,
      end_age: 100,
      distance: 160,
      storeLogin: (email: string, pref: Pref) => {
        set({
          isLoggedIn: true,
          gender: pref.gender,
          start_age: pref.start_age,
          end_age: pref.end_age,
          distance: pref.distance,
        });
        setEmail(email);
      },
      storeLogout: () => {
        set({
          isLoggedIn: false,
          gender: '',
          start_age: 0,
          end_age: 0,
          distance: 0,
        });
        removeEmail();
      },
    }),
    {
      name: 'preference',
    },
  ),
);
