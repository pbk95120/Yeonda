import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Pref {
  gender: string;
  start_age: number;
  end_age: number;
  distance: number;
}

interface Info {
  address: string;
  picture: string;
}

interface StoreState {
  isLoggedIn: boolean;
  storeLogin: (email: string, pref: Pref) => void;
  storeLogout: () => void;
  changePref: (pref: Pref) => void;
  changeInfo: (info: Info) => void;
  email: string;
  gender: string;
  start_age: number;
  end_age: number;
  distance: number;
  picture: string;
  address: string;
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
      picture: '',
      address: '',
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
      changeInfo: (info: Info) => {
        set({
          address: info.address,
          picture: info.picture,
        });
      },
      storeLogout: () => {
        set({
          isLoggedIn: false,
          gender: '',
          start_age: 0,
          end_age: 100,
          distance: 160,
          email: '',
        });
      },
    }),
    {
      name: 'preference',
      getStorage: () => localStorage,
    },
  ),
);
