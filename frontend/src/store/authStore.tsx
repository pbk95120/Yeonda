import { authenticated } from '@/api/user.api';
import { create } from 'zustand';
interface loginData {
  email: string;
  preferGender: string;
  startAge: number;
  endAge: number;
  distance: number;
}

interface StoreState {
  isLoggedIn: () => Promise<boolean>;
  email: string;
  preferGender: string;
  startAge: number;
  endAge: number;
  distance: number;
  storeLogin: (data: loginData) => void;
  storeLogout: () => void;
}

export const getEmail = (email: string) => email;
export const getPreferGender = (preferGender: string) => preferGender;
export const getStartAge = (startAge: number) => startAge;
export const getEndAge = (endAge: number) => endAge;
export const getDistance = (distance: number) => distance;
export const getIsLoggedIn = async () => await authenticated();

export const useAuthStore = create<StoreState>((set) => {
  return {
    isLoggedIn: async () => {
      return await authenticated();
    },
    email: '',
    preferGender: '',
    startAge: 0,
    endAge: 100,
    distance: 160,
    storeLogin: (data: loginData) => {
      set(() => ({
        isLoggedIn: async () => true,
        email: data.email,
        preferGender: data.preferGender,
        startAge: data.startAge,
        endAge: data.endAge,
        distance: data.distance,
      }));
    },
    storeLogout: () => {
      set(() => ({
        isLoggedIn: async () => false,
        email: '',
        preferGender: '',
        startAge: 0,
        endAge: 100,
        distance: 160,
      }));
    },
  };
});
