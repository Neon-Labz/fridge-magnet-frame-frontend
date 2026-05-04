import { create } from 'zustand'

export type AuthModalView = 'login' | 'register' | 'forgot-password' | 'reset-password'

interface AuthModalState {
  isOpen: boolean
  view: AuthModalView
  openModal: (view?: AuthModalView) => void
  closeModal: () => void
  switchView: (view: AuthModalView) => void
}

export const useAuthModal = create<AuthModalState>((set) => ({
  isOpen: false,
  view: 'login',
  
  openModal: (view = 'login') => set({ isOpen: true, view }),
  closeModal: () => set({ isOpen: false }),
  switchView: (view) => set({ view }),
}))
