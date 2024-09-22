import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  setLoginStatus: (status: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
  setLoginStatus: (status: boolean) => set({ isLoggedIn: status }),
}));
