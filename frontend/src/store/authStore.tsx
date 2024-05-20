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
  changePref: (pref: Pref) => void;
  email: string;
  gender: string;
  start_age: number;
  end_age: number;
  distance: number;
}

export const useAuthStore = create(
  persist<StoreState>(
    (set) => ({
      email: '',
      isLoggedIn: false,
      gender: '',
      start_age: 0,
      end_age: 100,
      distance: 160,
      storeLogin: (emailInput: string, pref: Pref) => {
        set({
          isLoggedIn: true,
          gender: pref.gender,
          start_age: pref.start_age,
          end_age: pref.end_age,
          distance: pref.distance,
          email: emailInput,
        });
      },
      changePref: (pref: Pref) => {
        set({
          gender: pref.gender,
          start_age: pref.start_age,
          end_age: pref.end_age,
          distance: pref.distance,
        });
      },
      storeLogout: () => {
        useAuthStore.persist.clearStorage();
      },
    }),
    {
      name: 'preference',
    },
  ),
);
