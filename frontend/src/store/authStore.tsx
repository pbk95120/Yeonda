import { create } from 'zustand';

interface LoginData {
  gender: string;
  start_age: number;
  end_age: number;
  distance: number;
}

interface StoreState {
  isLoggedIn: boolean;
  storeLogin: (email: string, pref: LoginData) => void;
  storeLogout: () => void;
  gender: string;
  start_age: number;
  end_age: number;
  distance: number;
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

export const useAuthStore = create<StoreState>((set) => ({
  isLoggedIn: !!getEmail(),
  gender: '',
  start_age: 0,
  end_age: 0,
  distance: 160,
  storeLogin: (email: string, pref: LoginData) => {
    console.log('Logging in with:', email, pref);
    setEmail(email);
    set({
      isLoggedIn: true,
      gender: pref.gender,
      start_age: pref.start_age,
      end_age: pref.end_age,
      distance: pref.distance,
    });
    console.log('State after login:', {
      isLoggedIn: true,
      gender: pref.gender,
      start_age: pref.start_age,
      end_age: pref.end_age,
      distance: pref.distance,
    });
  },
  storeLogout: () => {
    set({ isLoggedIn: false, gender: '', start_age: 0, end_age: 0, distance: 160 });
    removeEmail();
    console.log('Logged out');
  },
}));
