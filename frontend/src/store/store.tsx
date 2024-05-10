import { create } from 'zustand';

interface Store {
  selectedButton: string | null;
  count: number;
  setSelectedButton: (button: string) => void;
  incrementCount: () => void;
  removeCount: () => void;
}

const useStore = create<Store>((set) => ({
  selectedButton: null,
  count: 0,
  setSelectedButton: (button) => set({ selectedButton: button }),
  incrementCount: () => set((state) => ({ count: state.count + 1 })),
  removeCount: () => set({ count: 0 }),
}));

export default useStore;
