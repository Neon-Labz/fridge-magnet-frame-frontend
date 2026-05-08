import { create } from 'zustand';

export type FrameOption = 'without-frame' | 'black-frame' | 'white-frame';

interface FrameState {
  selectedFrame: FrameOption;
  setSelectedFrame: (frame: FrameOption) => void;
}

export const useFrameStore = create<FrameState>((set) => ({
  selectedFrame: 'black-frame',
  setSelectedFrame: (frame: FrameOption) => set({ selectedFrame: frame }),
}));
