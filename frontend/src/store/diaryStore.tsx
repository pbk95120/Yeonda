import { create } from 'zustand';

interface DiaryItemState {
  isEditing: boolean;
  isMyDiaryPage: boolean;
  isSuggestionPage: boolean;
  isPopularPage: boolean;
  isChatProfilePage: boolean;
  setIsEditing: (isEditing: boolean) => void;
  setIsMyDiaryPage: (isMyDiaryPage: boolean) => void;
  setIsSuggestionPage: (isSuggestionPage: boolean) => void;
  setIsPopularPage: (isPopularPage: boolean) => void;
  setIsChatProfilePage: (isChatProfilePage: boolean) => void;
}

export const useDiaryItemStore = create<DiaryItemState>((set) => ({
  isEditing: false,
  isMyDiaryPage: false,
  isSuggestionPage: false,
  isPopularPage: false,
  isChatProfilePage: false,
  setIsEditing: (isEditing) => set({ isEditing }),
  setIsMyDiaryPage: (isMyDiaryPage) => set({ isMyDiaryPage }),
  setIsSuggestionPage: (isSuggestionPage) => set({ isSuggestionPage }),
  setIsPopularPage: (isPopularPage) => set({ isPopularPage }),
  setIsChatProfilePage: (isChatProfilePage) => set({ isChatProfilePage }),
}));
