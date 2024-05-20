import { Tag } from '@/components/join/Interest';
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
  changePref: (pref: Pref) => void;
  changeInfo: (info: Info) => void;
  changeTags: (tags: Tag[]) => void;
  gender: string;
  start_age: number;
  end_age: number;
  distance: number;
  picture: string;
  address: string;
  myTags: Tag[];
}

export const myPageStore = create(
  persist<StoreState>(
    (set) => ({
      gender: '',
      start_age: 0,
      end_age: 100,
      distance: 160,
      picture: '',
      address: '',
      myTags: [],
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
      changeTags: (tags: Tag[]) => {
        set({
          myTags: tags,
        });
      },
    }),
    {
      name: 'myAllInfo',
    },
  ),
);
