import { create } from 'zustand';

interface LogoutModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useLogoutModal = create<LogoutModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
