import { create } from 'zustand';

export type FrameOption = 'without-frame' | 'black-frame' | 'white-frame';

interface FrameState {
  selectedFrame: FrameOption;
  selectedProductId: string | null;
  setSelectedFrame: (frame: FrameOption) => void;
  setSelectedProductId: (productId: string | null) => void;
}

export const useFrameStore = create<FrameState>((set) => ({
  selectedFrame: 'black-frame',
  selectedProductId: null,
  setSelectedFrame: (frame) => set({ selectedFrame: frame }),
  setSelectedProductId: (productId) => set({ selectedProductId: productId }),
}));
