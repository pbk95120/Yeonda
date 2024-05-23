import { Tag } from '@/types/type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SuggestionDiary {
  id: number;
  title: string;
  content: string;
  tags: Tag[];
  like: number;
}

interface DiaryItemState {
  isEditing: boolean;
  isMyDiaryPage: boolean;
  isSuggestionPage: boolean;
  isPopularPage: boolean;
  isChatProfilePage: boolean;
  preferId: number[];
  suggestionDiary: SuggestionDiary;
  setIsEditing: (isEditing: boolean) => void;
  setIsMyDiaryPage: (isMyDiaryPage: boolean) => void;
  setIsSuggestionPage: (isSuggestionPage: boolean) => void;
  setIsPopularPage: (isPopularPage: boolean) => void;
  setIsChatProfilePage: (isChatProfilePage: boolean) => void;
  setPreferId: (preferId: number[]) => void;
  setDiaryData: (diary: SuggestionDiary) => void;
}

export const useDiaryItemStore = create(
  persist<DiaryItemState>(
    (set) => ({
      isEditing: false,
      isMyDiaryPage: false,
      isSuggestionPage: false,
      isPopularPage: false,
      isChatProfilePage: false,
      suggestionDiary: {
        id: 1,
        title: '',
        content: '',
        tags: [],
        like: 1,
      },
      preferId: [],
      setIsEditing: (isEditing) => set({ isEditing }),
      setIsMyDiaryPage: (isMyDiaryPage) => set({ isMyDiaryPage }),
      setIsSuggestionPage: (isSuggestionPage) => set({ isSuggestionPage }),
      setIsPopularPage: (isPopularPage) => set({ isPopularPage }),
      setIsChatProfilePage: (isChatProfilePage) => set({ isChatProfilePage }),
      setDiaryData: (data) =>
        set({
          suggestionDiary: data,
        }),
      setPreferId: (preferId) =>
        set({
          preferId: preferId.slice(1),
        }),
    }),
    {
      name: 'diary-item-storage',
      getStorage: () => localStorage,
    },
  ),
);
