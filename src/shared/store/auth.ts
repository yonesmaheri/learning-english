import { create } from "zustand";

type AuthState = {
  is_loggedin: boolean | null;
  setIsLoggedIn: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  is_loggedin: null,
  setIsLoggedIn: (value) => set({ is_loggedin: value }),
}));
